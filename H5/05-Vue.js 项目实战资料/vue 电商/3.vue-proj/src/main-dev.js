import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入进度条插件
import NProgress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8889/api/private/v1/'
axios.interceptors.request.use(config => {
  // 当进入 request拦截器, 表示发送了请求, 我们就开启进度条
  NProgress.start()
  // console.log('请求前 authorization:' + config.toString())
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log('请求前 authorization:' + config.headers.Authorization)
  // 在最后必须 return config
  return config
})
// 在response 拦截器中, 隐藏进度条
axios.interceptors.response.use(config => {
  // 当进入股 response 拦截器, 表示请求已经结束, 我们就结束进度条
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 自定义时间过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal * 1000)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
