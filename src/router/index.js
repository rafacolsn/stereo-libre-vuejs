import Vue from "vue";
import VueRouter from "vue-router";
import Episodes from "@/views/Episodes";
import Episode from "@/views/Episode";
import Cards from "@/views/Cards";
import Category from "@/views/Category";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: '/',
            name: '',
            redirect: 'home'
        },
        {
            path: '/home',
            name: 'home',
            component: Cards,
        },
        {
            path: '/episodes',
            name: 'episodes',
            component: Episodes
        },
        {
            path: '/episode/:id',
            name: 'episode',
            component: Episode,
        },
        {
            path: '/category/:id',
            name: 'category',
            component: Category,
        },
    ]
})

export default router;