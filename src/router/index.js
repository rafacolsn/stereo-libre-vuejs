import Vue from "vue";
import VueRouter from "vue-router";
import Episode from "@/views/Episode";
import MainView from "@/views/MainView.vue";
import History from "@/views/History";
// import Category from "@/views/Category";
import Us from "@/views/Us";
import Host from "@/views/Host";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: "/",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: '',
            component: MainView,
        },
        {
            path: '/us',
            name: 'us',
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
        {
            path: '/history',
            name: 'history',
            component: History,
        },
        // Pages "carte de visite" (QR codes au verso des cartes)
        {
            path: '/:host(raph|jerome|adri)',
            name: 'host',
            component: Host,
        },
        { path: '/dje', redirect: '/jerome' },
        { path: '/djé', redirect: '/jerome' },

    ]
})
export default router;
