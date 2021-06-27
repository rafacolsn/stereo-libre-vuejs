const getDefaultState = () => {
    return {
        loading: false,
        filtered: false,
        posts: [],
        categories: [],
        colors: [
            {10: '#008BE2'}, // artistes
            {15: '#846700'}, // courant musical
            {9: '#E09900'}, // Découvertes
            {7: '#0C71C3'}, // Instruments
            {17: '#8300E9'}, // Labels
            {8: '#FFE121'}, // Live
            {12: '#177319'}, // Thème
            {11: '#5d5d4b'}, // Vintage
            {16: '#d650d0'} // Voyages
        ],
        lastPostByCategories: [],
        postsByCategories: []
    };
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        setLoading(state, value) {
            state.loading = value;
        },
        setFiltered(state, value) {
            state.filtered = value;
        },
        setPosts(state, value) {
            state.posts = value;
        },
        setCategories(state, value) {
            state.categories = value
        },
        setPostsByCategories(state, value) {
            state.postsByCategories = value
        },
        setLastPostByCategories(state, value) {
            state.lastPostByCategories.push(value)
        },
        resetLastPostByCategories(state) {
            state.lastPostByCategories = [];
        },
        resetPostsByCategories(state) {
            state.postsByCategories = []
        }
    },
    actions: {
        getEpisodes(context) {
            context.commit("setLoading", true)
            fetch('https://stereolibre.be/wp-json/wp/v2/posts/?categories=4&per_page=100').then(resp => {
                resp.json().then(r => {
                    context.commit("setPosts", r)
                    context.commit("setLoading", false)
                })
            })

        },
        switchFilteredPosts(context, id) {
            context.commit("setLoading", true)
            context.dispatch("getPostsByCategoryId", id)
            context.commit("setLoading", false)
        },
        getOnePostByCategoryId(context, id) {
            context.commit("setLoading", true)
            fetch(`https://stereolibre.be/wp-json/wp/v2/posts/?categories=${id}&per_page=1`).then(resp => {
                resp.json().then(r => {
                    context.commit("setLastPostByCategories", r[0])
                    context.commit("setLoading", false)
                })
            })

        },
        getPostsByCategoryId(context, id) {
            context.commit("setLoading", true)
            fetch(`https://stereolibre.be/wp-json/wp/v2/posts/?categories=${id}&per_page=48`).then(resp => {
                resp.json().then(r => {
                    context.commit("setPostsByCategories", r)
                    context.commit('setPosts', context.state.postsByCategories);
                    context.commit("setLoading", false)
                })
            })

        },
        getCategories(context) {
            context.commit("setLoading", true)
            fetch("https://stereolibre.be/wp-json/wp/v2/categories?per_page=100").then(resp => {
                resp.json().then(r => {
                    context.commit('setCategories', r)
                })
            })
            context.commit("setLoading", false)
        },
        getOnePostPerCategories(context) {
            context.commit('resetLastPostByCategories');
            context.commit("setLoading", true)
            context.getters.filteredCategories.map(cat => context.dispatch("getOnePostByCategoryId", cat.id))
            context.state.lastPostByCategories = context.state.lastPostByCategories.sort((a, b) => {
                return a.date - b.date
            })
            context.commit('setPosts', context.state.lastPostByCategories)
            context.commit("setLoading", false)
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
            // 1 = uncategorized, 4 = episodes, 25 = trailer
            return state.categories.filter(cat => ! [1, 4, 25].includes(cat.id))
        }
    }
}
