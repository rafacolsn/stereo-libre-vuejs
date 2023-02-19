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
        list: [],
        categories: [],
        colors: [
            {6: '#899499'}, // episodes
            {12: '#008BE2'}, // artistes
            {7: '#2ca88b'}, // cinéma
            {14: '#846700'}, // courant musical
            {10: '#E09900'}, // Découvertes
            {15: '#0C71C3'}, // Instruments
            {16: '#8300E9'}, // Labels
            {11: '#FFE121'}, // Live
            {13: '#1d8920'}, // Thème
            {8: '#af3832'}, // Vintage
            {9: '#d650d0'} // Voyages
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
                            let id = 6;
                            // a post has 2 categories, has we don't want the 6th (Episodes)
                            id = context.state.post.categories.find(id => id !== 6);
                            context.commit('setCategory', context.getters.getCategoryById(id))
                            context.commit('setColor', context.getters.getColorById(id)[id]);
                            context.commit("setLoading", false)
                        })
                    })
                })
            })


        },
        async getEpisodes(context, category = 6, number = 48) {
            context.commit("setLoading", true)
            return await fetch('https://admin.stereolibre.be/wp-json/wp/v2/posts/?categories=' + category + '&per_page=' + number)
                .then(resp => {
                    resp.json().then(r => {
                        context.commit("setPosts", r)
                        context.commit("setLoading", false)
                    })
                })

        },
        async getAll(context) {
            context.commit("setLoading", true)
            context.commit("setList", [])

            let categories = context.state.categories.filter(cat => ! [1, 6, 25].includes(cat.id));
            categories.forEach(async cat => await fetch('https://admin.stereolibre.be/wp-json/wp/v2/posts/?categories=' + cat.id + '&per_page=100')
                .then(resp => {
                    resp.json().then(r => {
                        r.map(item => context.commit('pushList', item));
                    })
                    // context.commit("setPost", context.state.list[0])
                }));

            context.commit("setLoading", false)

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

            let categories = context.state.categories.filter(cat => ! [1, 6, 25].includes(cat.id));
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
            // 1 = uncategorized, 6 = episodes, 25 = trailer
            return state.categories.filter(cat => ! [1, 6, 25].includes(cat.id))
        },
    }
}
