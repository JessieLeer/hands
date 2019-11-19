// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'
import 'vant/lib/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/function.css'
import '@/assets/css/custom.css'

Vue.config.productionTip = false
axios.defaults.baseURL = location.href.indexOf("localhost") > 0 ? "/api" : 'http://122.51.12.197:8090/'
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
