import Vue from "vue";
import VueRouter from "vue-router";
import Episode from "@/views/Episode";
import MainView from "@/views/MainView.vue";
// import Category from "@/views/Category";
import Us from "@/views/Us";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: '/',
            name: '',
            component: MainView,
        },
        {
            path: '/nous',
            name: 'nous',
            component: Us,
        },
        {
            path: '/episode/:id',
            name: 'episode',
            component: Episode,
        },
        {
            path: '/category/:id',
            name: 'category',
            component: MainView,
        },
    ]
})
export default router;
