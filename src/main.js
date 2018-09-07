import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import $ from 'jquery'

import ContentParent from './components/content/ContentParent';
import PromotionParent from './components/promotion/PromotionParent';

Object.defineProperty(Vue.prototype, '$axios', {value: axios});

$.extend(true, $.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
});

const router = new VueRouter({
  routes: [
    {
      path: '/content',
      component: ContentParent
    },
    {
      path: '/promotion',
      component: PromotionParent
    }
  ],
  mode: 'history'
});

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(datePicker);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
