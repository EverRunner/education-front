import Vue from "vue";

import "normalize.css/normalize.css"; // 一个现代的替代CSS重置

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./permission"; // permission control

import "./visit"; // 访问记录

// import _ from "lodash";

import 'animate.css'
import wow from 'wowjs'
Vue.prototype.$wow = wow


import "@utils/tools/element-ues";

import * as filter from "@utils/filters/filter";
import { API } from "@utils/http/api";

import VueIntro from 'vue-introjs'; //新手引导
Vue.use(VueIntro);


import 'intro.js/introjs.css';

import introJs from 'intro.js'

Vue.config.productionTip = false;




/**
 * 全局过滤器
 */
Object.keys(filter).forEach((key) => {
    Vue.filter(key, filter[key]);
});

/**
 * lodash挂载
 */
// Vue.prototype.$_ = _;

/**
 * 新手引导挂载
 */
Vue.prototype.$intro = introJs;


/**
 * api请求挂载
 */
Vue.prototype.$get = API.get;
Vue.prototype.$post = API.post;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");