import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Blog from './components/Blog.vue';

//const Foo = {template: '<div>foo</div>'};
//const Bar = {template: '<div>bar</div>'};
//const Emptycontent = {template: '<div>emptycontent</div>'};

const routes = [{
    path: '/',
    component: Blog,
}];

const router = new VueRouter({
    routes: routes
});

//console.log('export default router');

export default router;
