<template>
  <el-container class="home-container">
    <!-- 一般 el-header 这个也是类名 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>测试管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 左侧头部收缩按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 左侧栏 菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级 菜单 -->
          <!-- 注意 绑定 index 作为索引的时候, 这个index 只能接受 字符串, 所以这里 通过 + '' 字符串则隐式转为字符串 -->
          <el-submenu v-for="(item, index) in menulist" :key="item.id" :index="index + ''">
            <!-- 一级 菜单 的模板区域 -->
            <!-- 有名称的插槽  -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级 菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <!-- 二级模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- <el-button type="info" @click="logout">退出</el-button> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    // vue 初始化完成
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // this.$router.push("/login")
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存练级的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 获取所有菜单信息
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background-color: #333744!important;
}
// <!-- scoped 指令表示 下面的less 只对当前文件生效 -->
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      margin-left: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // border-block-color: #eaedf1;
      // border: 1px solid #eee;
      border: 3px solid #666;
      background-color: #ccc;
    }
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;

  .toggle-button {
    color: #fff;
    border-right: none;
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
</style>
