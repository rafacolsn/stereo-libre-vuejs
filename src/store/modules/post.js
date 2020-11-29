const getDefaultState = () => {
    return {
        loading: false,
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
        ]
    };
};

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        setLoading(state, value) {
            state.loading = value;
        },
        setPosts(state, value) {
            state.posts = value;
        },
        setCategories(state, value) {
            state.categories = value
        }
    },
    actions: {
        getPosts(context) {
            context.commit("setLoading", true)
            fetch('https://stereolibre.be/wp-json/wp/v2/posts/?categories=4&per_page=100').then(resp => {
                resp.json().then(r => {
                    context.commit("setPosts", r)
                    context.commit("setLoading", false)
                })
            })

        },
        getCategories(context) {
            fetch("https://stereolibre.be/wp-json/wp/v2/categories?per_page=100").then(resp => {
                resp.json().then(r => {
                    context.commit('setCategories', r)
                })
            })
        },
    },
    getters: {
        getCategoryById: (state) => (id) => {
            return state.categories.find(category => category.id === id)
        },
        getColorById: (state) => (id) => {
            return state.colors.find(color => color[id])
        }
    }
}
