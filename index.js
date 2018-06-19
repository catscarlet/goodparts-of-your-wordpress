import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import axios from 'axios';
import autop from 'wordpress-autop';

Vue.use(VueRouter);
Vue.prototype.$axios = axios;
Vue.prototype.$autop = autop;

Vue.config.devtools = true;

const app = new Vue({
    router,
}).$mount('#app');
