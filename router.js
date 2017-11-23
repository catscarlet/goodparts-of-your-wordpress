import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Blog from './components/Blog.vue';

const routes = [{
    path: '/',
    component: Blog,
}];

const router = new VueRouter({
    routes: routes
});

export default router;
