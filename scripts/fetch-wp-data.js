#!/usr/bin/env node
// Prebuild step: fetches categories + episodes from the WordPress REST API
// once, and caches them to disk so both generate-sitemap.js and
// prerender.js can reuse the same data without hitting the API twice.
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://admin.stereolibre.be/wp-json/wp/v2';

// Mirrors src/utils/categories.js excludedCategories — keep in sync.
const EXCLUDED_CATEGORIES = ['1', '6', '25', '500', '503'];

const OUTPUT_PATH = path.join(__dirname, '.generated-data.json');

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed (${res.status}): ${url}`);
    return res.json();
}

async function main() {
    console.log('[fetch-wp-data] Fetching categories...');
    const rawCategories = await fetchJson(`${BASE_URL}/categories?per_page=100`);
    const categories = rawCategories
        .map((cat) => ({id: String(cat.id), name: cat.name}))
        .filter((cat) => !EXCLUDED_CATEGORIES.includes(cat.id));

    console.log(`[fetch-wp-data] ${categories.length} categories kept.`);

    const episodesById = new Map();
    await Promise.all(
        categories.map(async (cat) => {
            const posts = await fetchJson(`${BASE_URL}/posts/?categories=${cat.id}&per_page=100`);
            for (const post of posts) {
                if (episodesById.has(String(post.id))) continue;
                episodesById.set(String(post.id), {
                    id: String(post.id),
                    title: post.title.rendered,
                    excerpt: post.excerpt.rendered,
                    date: post.date,
                    modified: post.modified,
                    categoryId: cat.id,
                });
            }
        })
    );

    const episodes = [...episodesById.values()];
    console.log(`[fetch-wp-data] ${episodes.length} episodes fetched.`);

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify({categories, episodes}, null, 2));
    console.log(`[fetch-wp-data] Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
    console.error('[fetch-wp-data] Failed:', err);
    process.exit(1);
});
