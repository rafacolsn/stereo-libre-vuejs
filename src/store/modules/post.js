import {colors} from "@/utils/colors";
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
        setImage(state, value) {
            state.image = value;
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
        async getEpisode(context, id) {
            try {
                context.commit("setLoading", true);
                const postResponse = await fetch(`${baseUrl}/posts/${id}`);
                const post = await postResponse.json();
                context.commit("setEpisode", post);

                // Fetch the featured media
                const mediaResponse = await fetch(`${baseUrl}/media/${post.featured_media}`);
                const media = await mediaResponse.json();
                context.commit("setImage", media);

                // a post has 2 categories, has we don't want the 6th (Episodes)
                const categoryId = post.categories.find(categoryId => categoryId !== categories.EPISODES);
                const category = context.getters.getCategoryById(categoryId);
                const color = context.getters.getColorById(categoryId)[categoryId];

                context.commit('setCategory', category);
                context.commit('setColor', color);
            } catch (error) {
                console.error("Failed to fetch episode data:", error);
            } finally {
                context.commit("setLoading", false);
            }
        },
        async getLastEpisodes(context) {
            try {
                context.commit("setLoading", true);
                const response = await fetch(`${baseUrl}/posts/?categories=${categories.EPISODES}&per_page=48`);
                const data = await response.json();
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

                const categories = context.state.categories.filter(cat => !excludedCategories.includes(cat.id));
                const fetchPromises = categories.map(cat =>
                    fetch(`${baseUrl}/posts/?categories=${cat.id}&per_page=100`)
                        .then(response => response.json())
                );

                const results = await Promise.all(fetchPromises);
                results.flat().forEach(item => context.commit('pushList', item));
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
                context.commit('setColor', colors.id);
                const response = await fetch(`${baseUrl}/posts/?categories=${id}&per_page=48`);
                const data = await response.json();
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
            return state.categories.find(category => category.id === id)
        },
        getColorById: (state) => (id) => {
            return state.colors.find(color => color[id])
        },
        filteredCategories(state) {
            return state.categories.filter(cat => !excludedCategories.includes(cat.id))
        },
        sortedEpisodesByCategory(state) {
            return state.postsByCategories.sort((a, b) => {
                return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
            })
        },
        sortedLastEpisodes(state) {
            if (state.lastEpisodes) {
                return state.lastEpisodes.sort((a, b) => {
                    return new Date(b.date.valueOf()) - new Date(a.date.valueOf())
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
}
