#!/usr/bin/env node
// Postbuild step: serves the freshly built dist/ folder locally and uses a
// headless browser to snapshot each route's fully-rendered HTML (including
// the meta tags vue-meta writes once data has loaded), so crawlers that
// don't execute JS still see real content and correct <title>/<meta> tags.
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const DATA_PATH = path.join(__dirname, '.generated-data.json');
const CONCURRENCY = 2;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
};

function startServer() {
    const server = http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        let filePath = path.join(DIST_DIR, urlPath);
        if (!filePath.startsWith(DIST_DIR)) {
            res.writeHead(403);
            res.end();
            return;
        }
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        if (!fs.existsSync(filePath)) {
            // SPA fallback, mirrors the Netlify redirect rule in public/netlify.toml
            filePath = path.join(DIST_DIR, 'index.html');
        }
        const ext = path.extname(filePath);
        res.writeHead(200, {'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'});
        fs.createReadStream(filePath).pipe(res);
    });
    return new Promise((resolve) => {
        server.listen(0, '127.0.0.1', () => resolve(server));
    });
}

function buildRoutes() {
    const {categories, episodes} = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    return [
        {route: '/', outFile: 'index.html'},
        {route: '/us', outFile: 'us/index.html'},
        {route: '/history', outFile: 'history/index.html'},
        ...categories.map((cat) => ({route: `/category/${cat.id}`, outFile: `category/${cat.id}/index.html`})),
        ...episodes.map((ep) => ({route: `/episode/${ep.id}`, outFile: `episode/${ep.id}/index.html`})),
    ];
}

async function asyncPool(concurrency, items, iteratorFn) {
    const executing = new Set();
    for (const item of items) {
        const p = iteratorFn(item).finally(() => executing.delete(p));
        executing.add(p);
        if (executing.size >= concurrency) {
            await Promise.race(executing);
        }
    }
    await Promise.all(executing);
}

async function main() {
    if (!fs.existsSync(DIST_DIR)) {
        throw new Error(`Build output directory not found: ${DIST_DIR}. Run "vue-cli-service build" first.`);
    }

    const server = await startServer();
    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    const browser = await puppeteer.launch({
        headless: true,
        // The build serves from a throwaway localhost origin while the app
        // fetches data from admin.stereolibre.be; disabling web security
        // avoids depending on that API's CORS policy allowing this origin.
        args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-origin', '--no-sandbox'],
    });

    // Warm up the browser process/CDP session outside the per-route timeout
    // budget - the first couple of pages opened right after launch are
    // consistently much slower (untimed here) than every page after them.
    const warmupPage = await browser.newPage();
    await warmupPage.goto(`${baseUrl}/us`, {waitUntil: 'domcontentloaded'});
    await warmupPage.close();

    const routes = buildRoutes();
    console.log(`[prerender] Rendering ${routes.length} routes...`);
    let failures = 0;

    async function renderOnce(route, outFile) {
        const page = await browser.newPage();
        try {
            // Episode/category images are fetched from a remote WP host and
            // aren't needed for meta tags or text content - blocking them
            // avoids dozens of slow cross-network image requests per page,
            // which is what was starving concurrent tabs of time to load.
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (req.resourceType() === 'image' || req.resourceType() === 'media') {
                    req.abort();
                } else {
                    req.continue();
                }
            });
            // Don't wait for full network idle: pages lazy-load dozens of
            // episode images that keep the network busy well past data
            // readiness. The __PRERENDER_READY__ flag (set once Vuex data
            // has loaded) is the actual signal we need for meta tags/content.
            await page.goto(`${baseUrl}${route}`, {waitUntil: 'domcontentloaded', timeout: 30000});
            await page.waitForFunction('window.__PRERENDER_READY__ === true', {timeout: 30000});
            // Let Vue flush the DOM/meta update that follows the data load.
            await new Promise((r) => setTimeout(r, 150));
            const html = await page.content();
            const outPath = path.join(DIST_DIR, outFile);
            fs.mkdirSync(path.dirname(outPath), {recursive: true});
            fs.writeFileSync(outPath, html);
        } finally {
            await page.close();
        }
    }

    await asyncPool(CONCURRENCY, routes, async ({route, outFile}) => {
        try {
            await renderOnce(route, outFile);
        } catch (err) {
            // The WP host occasionally struggles under the concurrent load
            // of several tabs independently re-fetching all categories/posts
            // at once - one retry absorbs that transient flakiness.
            console.warn(`[prerender] Retrying ${route} after: ${err.message}`);
            try {
                await renderOnce(route, outFile);
            } catch (err2) {
                failures++;
                console.error(`[prerender] Failed to render ${route}: ${err2.message}`);
            }
        }
    });

    await browser.close();
    server.close();

    console.log(`[prerender] Done. ${routes.length - failures}/${routes.length} routes rendered.`);
    if (failures > 0) {
        process.exit(1);
    }
}

main().catch((err) => {
    console.error('[prerender] Failed:', err);
    process.exit(1);
});
