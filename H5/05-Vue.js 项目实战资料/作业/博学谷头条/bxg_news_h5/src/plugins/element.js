
// 接着你可以在代码中直接引入 Vant 组件
// 插件会自动将代码转化为方式二中的按需引入形式
// 1. 导入 vue
import Vue from 'vue'
// 2. 按需导入需要的组件
import {
  Toast,
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Image,
  Icon,
  Tab,
  Tabs,
  // 列表
  List,
  Cell,
  CellGroup,
  Search,
  // 宫格
  Grid,
  GridItem,
  // 懒加载组件 配合 image 组件使用
  Lazyload
} from 'vant'

// 3. 按需导入样式
import 'vant/lib/toast/style'
import 'vant/lib/button/style'
import 'vant/lib/nav-bar/style'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
import 'vant/lib/image/style'
import 'vant/lib/icon/style'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'
import 'vant/lib/list/style'
import 'vant/lib/cell/style'
import 'vant/lib/cell-group/style'
import 'vant/lib/search/style'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import 'vant/lib/lazyload/style'

// 4. 绑定对应的组件到vue 上
// Vue.use(Toast)
Vue.prototype.$toast = Toast
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Search)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Lazyload, {
  lazyComponent: true
})
