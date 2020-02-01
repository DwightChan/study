import Vue from 'vue'
import './plugins/element.js'

import App from './App.vue'
import router from './router/index.js'
import store from './store'

import './assets/css/globe.css'

import axios from 'axios'
// 配置请求的路径
axios.defaults.baseURL = 'http://127.0.0.1:3001/'
axios.interceptors.request.use(config => {
  // 当进入 request 拦截器
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log('请求前 authorization:' + config.headers.Authorization)
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
