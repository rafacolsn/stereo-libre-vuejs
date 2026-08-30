import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from "./store/";
import router from "@/router";
import VueMq from "vue-mq";
import VueMeta from "vue-meta";

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueMeta)
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 900,
    desktop: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
}).$mount('#app')

