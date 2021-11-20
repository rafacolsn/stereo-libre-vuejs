import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import postModule from './modules/post';
import episodesModule from './modules/episodes';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,
    supportCircular: true,
})

export default new Vuex.Store({
    modules: {
        post: postModule,
        episodes: episodesModule
    },
    plugins: [vuexLocal.plugin]
});
