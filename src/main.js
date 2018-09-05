import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'

import BodyContent from './components/content/BodyContent';

Object.defineProperty(Vue.prototype, '$axios', {value: axios});

const router = new VueRouter({
  routes: [
    {
      path: '/content',
      component: BodyContent
    }
  ],
  mode: 'history'
});

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
