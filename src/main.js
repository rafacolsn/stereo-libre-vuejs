import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from "./store/";
import router from "@/router";

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
}).$mount('#app')

