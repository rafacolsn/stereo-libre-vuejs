# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run serve   # dev server (http://localhost:8080)
npm run build   # production build
npm run lint    # ESLint via vue-cli-service
```

There are no tests.

## Architecture

**Stéréo Libre** is a Vue 2 podcast website for a Belgian radio show. It fetches all data from a WordPress REST API backend at `https://admin.stereolibre.be/wp-json/wp/v2`.

### Data flow

On app boot (`App.vue created()`), two Vuex actions fire sequentially:
1. `post/getCategories` — fetches all WP categories, filters out `excludedCategories` (uncategorized, trailer, internal-use categories), stores filtered list
2. `post/getAll` — for each remaining category, fetches up to 100 posts and pushes them into `state.episodes` (deduped by ID)

Episode images are **not** fetched upfront — each `Card` and `Episode` component triggers `post/getImage` lazily on mount if `imageUrl` is missing on the episode object.

All Vuex state is persisted to `window.sessionStorage` via `vuex-persist`, so page refreshes within the same browser session skip the API calls.

### Vuex store (`src/store/modules/podcast.js`)

Single namespaced module `post`. Key getters:
- `sortedLastEpisodes` — most recent 48 episodes across all categories
- `sortedEpisodesByCategory(categoryId)` — all episodes for one category, sorted by date
- `filteredPodcasts` — episodes matching `state.searchQuery`
- `findEpisode(id)` / `findCategory(id)` — lookups by ID

### Routing

| Path | Component | Notes |
|---|---|---|
| `/` | `MainView` | Shows last 48 episodes or search results |
| `/category/:id` | `MainView` | Shows episodes for one category with episode-select dropdown |
| `/episode/:id` | `Episode` | Single episode detail |
| `/history` | `History` | Chronological list of all episodes with search |
| `/us` | `Us` | About page |

`MainView` serves double duty — it detects whether it's on a category route via `this.$route.name === 'category'`.

### Responsive breakpoints

`vue-mq` defines two breakpoints (configured in `main.js`):
- `mobile`: < 900px
- `desktop`: ≥ 900px

Components access the current breakpoint via `this.$mq`.

### Utilities

- `src/utils/categories.js` — `excludedCategories` array of WP category IDs to hide; `categories` map of display name → ID
- `src/utils/colors.js` — `getColorById(id)` maps a category ID to its hex accent color
- `src/utils/platforms.js` — streaming platform URLs (Spotify, Apple Podcasts, Deezer)

### Styling

All components use scoped SCSS. Global styles (reset, shared layout classes like `.content`, `.card-header`, `.cards`, `.tag`) live in `App.vue`'s unscoped `<style>` block. Moment.js locale is set to French (`fr`) globally in `App.vue created()`.
