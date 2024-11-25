import {excludedCategories} from "@/utils/categories";

const getDefaultState = () => {
    return {
        loading: false,
        categories: [],
        episodes: [],
        searchQuery: '',
    };
};

const baseUrl = "https://admin.stereolibre.be/wp-json/wp/v2";

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        setLoading(state, value) {
            state.loading = value;
        },
        pushEpisode(state, value) {
            if (!state.episodes.map(e => e.id).includes(value.id)) {
                state.episodes.push(value)
            }
        },
        setImageEpisode(state, payload) {
            const index = state.episodes.findIndex(e => e.id == payload.episodeId)
            state.episodes[index].imageUrl = payload.url;
        },
        setCategories(state, value) {
            state.categories = value
        },
        setSearchQuery(state, value) {
            state.searchQuery = value;
        },
    },
    actions: {
        async getCategories(context) {
            if (context.state.categories?.length > 0) {
                return;
            }
            try {
                context.commit('setLoading', true);
                const response = await fetch(`${baseUrl}/categories?per_page=100`).then(r => r.json());
                const data = response.map(cat => {
                    return {
                        id: '' + cat.id,
                        name: cat.name
                    }
                })
                const filteredCategories = data.filter(cat => !excludedCategories.includes(cat.id));
                context.commit('setCategories', filteredCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getAll(context) {
            try {
                await Promise.all(
                    context.state.categories.map(async (cat) => {
                        const response = await fetch(`${baseUrl}/posts/?categories=${cat.id}&per_page=100`);
                        const data = await response.json();
                        data.map(ep => {
                            context.commit("pushEpisode", {
                                category: cat,
                                id: '' + ep.id,
                                title: ep.title.rendered,
                                date: ep.date,
                                mediaId: ep.featured_media,
                                content: ep.content.rendered,
                                excerpt: ep.excerpt.rendered
                            });
                        });
                    })
                );
            } catch
                (error) {
                console.error('Error fetching posts:', error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        // Fetch the featured media
        async getImage(context, payload) {
            const mediaResponse = await fetch(`${baseUrl}/media/${payload.mediaId}`);
            const image = await mediaResponse.json();
            context.commit("setImageEpisode", {
                episodeId: payload.episodeId,
                url: image.source_url
            })
        },
    },
    getters: {
        filteredPosts: (state) => (categoryId, searchQuery) => {
            return state.posts.filter(post => {
                const matchesCategory = categoryId ? post.categories.includes(categoryId) : true;
                const matchesSearch = searchQuery ? post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) : true;
                return matchesCategory && matchesSearch;
            });
        },
        findEpisode: (state) => (id) => {
            return state.episodes.find(e => e.id == id);
        },
        findCategory: (state) => (id) => {
            return state.categories.find(e => e.id == id);
        },
        getCategoryById: (state) => (id) => {
            return state.categories.find(category => category.id === id);
        },
        sortedEpisodesByCategory: (state) => (categoryId) => {
            return sortByDates(state.episodes.filter(e => e.category.id === categoryId));
        },
        sortedLastEpisodes(state) {
            if (state.episodes) {
                return sortByDates(state.episodes).slice(0, 48)
            }
            return [];
        },
        filteredPodcasts(state) {
            if (state.searchQuery) {
                return state.episodes.filter(podcast =>
                    podcast.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
            return [];
        }
    }
};

function sortByDates(episodes) {
    return episodes.sort((a, b) => {
        return new Date(b.date.valueOf()) - new Date(a.date.valueOf());
    })
}