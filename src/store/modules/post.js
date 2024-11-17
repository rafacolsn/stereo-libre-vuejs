import {colors, getColorById} from "@/utils/colors";
import {categories, excludedCategories} from "@/utils/categories";

const getDefaultState = () => {
    return {
        loading: false,
        filtered: false,
        episode: {},
        image: {},
        category: {
            name: null
        },
        color: null,
        lastEpisodes: [],
        list: [],
        categories: [],
        colors: colors,
        lastPostByCategories: [],
        postsByCategories: [],
        searchQuery: ''
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
        setLastEpisodes(state, value) {
            state.lastEpisodes = value;
        },
        setList(state, value) {
            state.list = value;
        },
        pushList(state, value) {
            state.list.push(value);
        },
        setCategory(state, value) {
            state.category = value;
        },
        setColor(state, value) {
            state.color = value;
        },
        setEpisode(state, value) {
            state.episode = value;
        },
        setCategories(state, value) {
            state.categories = value
        },
        setPostsByCategories(state, value) {
            state.postsByCategories = value
        },
        setSearchQuery(state, value) {
            state.searchQuery = value;
        },
    },
    actions: {
        async getImage(context, mediaId) {
            // Fetch the featured media
            const mediaResponse = await fetch(`${baseUrl}/media/${mediaId}`);
            return await mediaResponse.json();
        },
        async formatPodcast(context, post) {
            let data = {...post};
            const image = await context.dispatch("getImage", post.featured_media);
            data.imageUrl = image.source_url;
            const categoryId = post.categories.find(categoryId => !excludedCategories.includes(categoryId));
            data.category = context.getters.getCategoryById(categoryId);
            return data;
        },
        async getEpisode(context, id) {
            try {
                context.commit("setLoading", true);
                const postResponse = await fetch(`${baseUrl}/posts/${id}`);
                let post = await postResponse.json();

                // Format the podcast
                post = await context.dispatch("formatPodcast", post);
                context.commit("setEpisode", post);

                // Set category and color
                const categoryId = post.categories.find(categoryId => categoryId !== categories.EPISODES);
                const category = context.getters.getCategoryById(categoryId);
                context.commit('setCategory', category);
                context.commit('setColor', getColorById(categoryId));
            } catch (error) {
                console.error("Failed to fetch episode data:", error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getLastEpisodes(context) {
            if (this.lastEpisodes?.length > 1) {
                return;
            }
            try {
                context.commit("setLoading", true);
                const response = await fetch(`${baseUrl}/posts/?categories=${categories.EPISODES}&per_page=48`);
                let data = await response.json();

                // Format all episodes
                data = await Promise.all(data.map(post => context.dispatch("formatPodcast", post)));
                context.commit("setLastEpisodes", data);
            } catch (error) {
                console.error('Error fetching last episodes:', error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getAll(context) {
            try {
                context.commit("setLoading", true);
                context.commit("setList", []);

                const filteredCategories = context.state.categories.filter(cat => !excludedCategories.includes(cat.id));
                const fetchPromises = filteredCategories.map(cat =>
                    fetch(`${baseUrl}/posts/?categories=${cat.id}&per_page=100`)
                        .then(response => response.json())
                );

                const results = await Promise.all(fetchPromises);
                let formattedResults = await Promise.all(results.flat().map(post => context.dispatch("formatPodcast", post)));

                formattedResults.forEach((item) => {
                    context.commit('pushList', item);
                });
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getPostsByCategoryId(context, id) {
            if (context.state.category && context.state.category.id === id) {
                return;
            }
            context.commit("setLoading", true);
            try {
                context.commit('setCategory', context.getters.getCategoryById(parseInt(id)));
                context.commit('setColor', getColorById(parseInt(id)));
                const response = await fetch(`${baseUrl}/posts/?categories=${id}&per_page=48`);
                let data = await response.json();

                // Format all posts by category
                data = await Promise.all(data.map(post => context.dispatch("formatPodcast", post)));
                context.commit("setPostsByCategories", data);
            } catch (error) {
                console.error('Error fetching posts by category ID:', error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getCategories(context) {
            try {
                const response = await fetch(`${baseUrl}/categories?per_page=100`);
                const data = await response.json();
                context.commit('setCategories', data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
    },
    getters: {
        getCategoryById: (state) => (id) => {
            return state.categories.find(category => category.id === id);
        },
        filteredCategories(state) {
            return state.categories.filter(cat => !excludedCategories.includes(cat.id));
        },
        sortedEpisodesByCategory(state) {
            return state.postsByCategories.sort((a, b) => {
                return new Date(b.date.valueOf()) - new Date(a.date.valueOf());
            });
        },
        sortedLastEpisodes(state) {
            if (state.lastEpisodes) {
                return state.lastEpisodes.sort((a, b) => {
                    return new Date(b.date.valueOf()) - new Date(a.date.valueOf());
                });
            }
            return [];
        },
        filteredPodcasts(state) {
            if (state.searchQuery) {
                return state.list.filter(podcast =>
                    podcast.title.rendered.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
            return [];
        }
    }
};
