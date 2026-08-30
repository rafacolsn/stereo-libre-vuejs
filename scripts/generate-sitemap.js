#!/usr/bin/env node
// Postbuild step: turns the data cached by fetch-wp-data.js into a static
// sitemap.xml written straight into the build output directory.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.stereolibre.be';
const DATA_PATH = path.join(__dirname, '.generated-data.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'dist');

function urlEntry(loc, {lastmod, changefreq, priority}) {
    return [
        '  <url>',
        `    <loc>${SITE_URL}${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
        priority !== undefined ? `    <priority>${priority}</priority>` : null,
        '  </url>',
    ].filter(Boolean).join('\n');
}

function main() {
    const {categories, episodes} = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const today = new Date().toISOString().slice(0, 10);

    const entries = [
        urlEntry('/', {lastmod: today, changefreq: 'daily', priority: '1.0'}),
        urlEntry('/history', {lastmod: today, changefreq: 'daily', priority: '0.6'}),
        urlEntry('/us', {changefreq: 'monthly', priority: '0.3'}),
        ...categories.map((cat) => urlEntry(`/category/${cat.id}`, {
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.7',
        })),
        ...episodes.map((ep) => urlEntry(`/episode/${ep.id}`, {
            lastmod: (ep.modified || ep.date || '').slice(0, 10) || undefined,
            changefreq: 'monthly',
            priority: '0.6',
        })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

    if (!fs.existsSync(OUTPUT_DIR)) {
        throw new Error(`Build output directory not found: ${OUTPUT_DIR}. Run "vue-cli-service build" first.`);
    }

    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), xml);
    console.log(`[generate-sitemap] Wrote ${entries.length} URLs to ${path.join(OUTPUT_DIR, 'sitemap.xml')}`);
}

main();
