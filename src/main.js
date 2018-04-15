import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueResource from 'vue-resource';
import VueCookie from 'vue-cookie';
import VueRouter from 'vue-router';
import BabelPolyfill from 'babel-polyfill';

import routes from './routes';

import 'element-ui/lib/theme-chalk/index.css';

locale.use(lang);
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
