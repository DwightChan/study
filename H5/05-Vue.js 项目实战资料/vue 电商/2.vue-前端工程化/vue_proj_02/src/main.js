import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入了element 依赖
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
