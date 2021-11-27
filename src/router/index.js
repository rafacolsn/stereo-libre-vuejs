import Vue from "vue";
import VueRouter from "vue-router";
import Episodes from "@/views/Episodes";
import Episode from "@/views/Episode";
import Cards from "@/views/Cards";
import Category from "@/views/Category";
import Us from "@/views/Us";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes: [
        {
            path: '/',
            name: '',
            component: Cards,
        },
        {
            path: '/nous',
            name: 'nous',
            component: Us,
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
// router.replace({ path: '*', redirect: '/' })
export default router;
