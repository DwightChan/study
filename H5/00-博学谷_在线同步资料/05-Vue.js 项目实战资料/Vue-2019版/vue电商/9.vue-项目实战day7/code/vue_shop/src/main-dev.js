import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

// 富文本编辑器的安装使用:
// 1. 在vue ui 添加依赖 vue-quill-editor 富文本编辑器的依赖
// 2. 导入并 挂载为全局组件
// 3. 在需要用到的页面进行使用
//    <!-- 富文本编辑器组件 -->
//    <quill-editor v-model="addForm.goods_introduce"></quill-editor>

// 深拷贝组件使用:
// 1. 在vue ui 添加依赖 Loadash 深拷贝的依赖 (中文文档 http://lodash.think2011.net/cloneDeep)
// 2. 在需要用到的文件中导入依赖, 并且注意命名 是下划线 _ , 这个就和 jQuery 命名为 $ 同理 
//    <script>
//    import _ from 'lodash'
//    // lodash   cloneDeep(obj)
//    // 深拷贝出一个新的对象
//    const form = _.cloneDeep(this.addForm)
//    </script>

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
        // console.log(config)
        NProgress.start()
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 在最后必须 return config
        return config
    })
    // 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
    // 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal)

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