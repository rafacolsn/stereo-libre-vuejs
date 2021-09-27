const getDefaultState = () => {
    return {
        loading: false,
        filtered: false,
        post: {},
        image: {},
        category: {
            name: null
        },
        color: null,
        posts: [],
        categories: [],
        colors: [
            {4: '#899499'}, // episodes
            {10: '#008BE2'}, // artistes
            {15: '#846700'}, // courant musical
            {9: '#E09900'}, // Découvertes
            {7: '#0C71C3'}, // Instruments
            {17: '#8300E9'}, // Labels
            {8: '#FFE121'}, // Live
            {12: '#1d8920'}, // Thème
            {11: '#af3832'}, // Vintage
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
        setPost(state, value) {
            state.post = value;
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
        async getEpisode(context, id) {
            context.commit("setLoading", true)
            await fetch(`https://admin.stereolibre.be/wp-json/wp/v2/posts/${id}`).then(resp => {
                resp.json().then(r => {
                    context.commit("setPost", r)
                    fetch(`https://admin.stereolibre.be/wp-json/wp/v2/media/${context.state.post.featured_media}`).then(resp => {
                        resp.json().then(r => {
                            context.commit("setImage", r)
                            let id = 4;
                            // a post has 2 categories, has we don't want the 4th (Episodes)
                            id = context.state.post.categories.find(id => id !== 4);
                            context.commit('setCategory', context.getters.getCategoryById(id))
                            context.commit('setColor', context.getters.getColorById(id)[id]);
                            context.commit("setLoading", false)
                        })
                    })
                })
            })


        },
        async getEpisodes(context) {
            context.commit("setLoading", true)
            return await fetch('https://admin.stereolibre.be/wp-json/wp/v2/posts/?categories=4&per_page=100').then(resp => {
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
        async getOnePostByCategoryId(context, id) {
            context.commit("setLoading", true)
            await fetch(`https://admin.stereolibre.be/wp-json/wp/v2/posts/?categories=${id}&per_page=1`).then(resp => {
                resp.json().then(r => {
                    context.commit("setLastPostByCategories", r[0])
                    context.commit("setLoading", false)
                })
            })
        },
        async getPostsByCategoryId(context, id) {
            context.commit("setLoading", true)
            return await fetch(`https://admin.stereolibre.be/wp-json/wp/v2/posts/?categories=${id}&per_page=48`).then(resp => {
                resp.json().then(r => {
                    context.commit("setPostsByCategories", r)
                    context.commit('setPosts', context.state.postsByCategories);
                    context.commit("setLoading", false)
                })
            })

        },
        async getCategories(context) {
            let response = await fetch("https://admin.stereolibre.be/wp-json/wp/v2/categories?per_page=100");
            context.commit('setCategories', await response.json())
        },
        async getOnePostPerCategories(context) {
            context.commit('resetLastPostByCategories');
            context.commit("setLoading", true)
            if (context.state.categories.length < 1) {
                await context.dispatch("getCategories");
            }

            let categories = context.state.categories.filter(cat => ! [1, 4, 25].includes(cat.id));
            categories.forEach(cat => context.dispatch("getOnePostByCategoryId", cat.id))
            context.commit('setPosts', context.state.lastPostByCategories)
            context.commit("setLoading", false)
        },
    },
    getters: {
        getPostById: (state) => (id) => {
            return state.posts.find(post => post.id === id)
        },
        getCategoryById: (state) => (id) => {
            return state.categories.find(category => category.id === id)
        },
        getColorById: (state) => (id) => {
            return state.colors.find(color => color[id])
        },
        filteredCategories(state) {
            // 1 = uncategorized, 4 = episodes, 25 = trailer
            return state.categories.filter(cat => ! [1, 4, 25].includes(cat.id))
        },
    }
}
