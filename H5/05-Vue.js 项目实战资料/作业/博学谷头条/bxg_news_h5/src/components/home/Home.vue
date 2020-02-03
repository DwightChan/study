<template>
  <div>
    <!-- 导航栏部分区域 -->
    <van-nav-bar
      :left-arrow="false"
      @click-left="onNavClickLeftEmail"
      @click-right="onNavClickRightSearch"
    >
      <van-icon span="4" name="search" slot="right"/>
      <van-icon span="4" name="envelop-o" slot="left"/>
      <img src="../../assets/logo.png" alt="" slot="title">
    </van-nav-bar>

    <!-- tab 区域 -->
    <van-tabs @click="tabItmeClick" sticky>
      <!-- 如果没有 key 作为唯一标识 会出错 -->
      <van-tab
        v-for="(item, index) in tabTitles"
        :title="item.title"
        :name="item.id"
        :key="index"
      >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="tabItmeClick(item.id, item.title)"
          >
            <van-cell
              v-for="(model) in currentList"
              :key="model.id"
              is-link
              :url="model.url"
              >
              <p class="dw-van-cell-title">{{model.title}}</p>
              <van-grid
                :border="false"
                :column-num="2"
              >
                <van-grid-item>
                  <lazy-component>
                  <van-image lazy-load :src="model.thumbnail_pic_s" />
                  </lazy-component>
                </van-grid-item>
                <van-grid-item>
                  <lazy-component>
                  <van-image lazy-load :src="model.thumbnail_pic_s02" />
                  </lazy-component>
                </van-grid-item>
              </van-grid>
              <div slot="label" class="dw-cell-label">
                <span>时间: {{model.date}}</span>
                <span>作者: {{model.author_name}}</span>
              </div>

            </van-cell>
          </van-list>
      </van-tab>
    </van-tabs>

    <!-- tabbar 区域 -->
    <van-tabbar v-model="tabbarIndex">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">列表</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选中当天首页的tabbar
      tabbarIndex: 'home',
      // tab 的titles 数据
      tabTitles: [{
        id: 'top',
        title: '头条'
      }, {
        id: 'shehui',
        title: '社会'
      }, {
        id: 'guonei',
        title: '国内'
      }, {
        id: 'guoji',
        title: '国际'
      }, {
        id: 'yule',
        title: '娱乐'
      }, {
        id: 'tiyu',
        title: '体育'
      }, {
        id: 'keji',
        title: '科技'
      }],
      // 当前是选中第 index 个tab
      tabIndex: 0,
      // 所有 tabTitles 对应的所有数据 数组中有数组 [[],[],[],[],...], 第二层数组对应每一个tab
      list: [],
      // 是否显示正在加载 状态
      loading: false,
      // 是否显示加载已经完成状态
      finished: false,
      // 是否显示正在刷新状态
      refreshing: false,
      // 当前的 tab 的id
      currentTabId: '',
      // 从list 中获取到对应第一个需要被选中正在显示的数组数据, 就是list 中一个元素,这个元素是一个数组
      currentList: []
    }
  },
  mounted: function() {
    this.currentTabId = this.currentTabId ? this.urrentTabId : this.tabTitles[0].id
    this.tabItmeClick(this.currentTabId, '')
  },
  // 方法
  methods: {
    // 导航栏 左边按钮 被点击事件
    onNavClickLeftEmail() {
      console.log('点击了左边按钮')
    },
    // 导航栏 右边按钮 被点击事件
    onNavClickRightSearch() {
      console.log('点击了导航栏右边按钮')
      // this.$router.push('/goods/add')
      // router
      this.$router.push('/search')
    },
    // 点击率 tab 中其中item
    async tabItmeClick(name, title) {
      if (this.currentList === name) {
        return
      }
      this.currentTabId = name
      console.log(this.currentTabId, title)
      const index = this.tabTitles.findIndex(item => item.id === this.currentTabId)
      this.tabIndex = index
      console.log(index)
      // 保存当前数据 方便下次快速获取
      if (this.list.length >= index + 1) {
        this.list[index] = this.currentList
        this.currentList = this.list[index]
      } else {
        for (let index = 0; index < (index) - this.list.length; index++) {
          this.list.push([])
        }
        this.list.push(this.currentList)
        this.currentList = this.list[index]
      }
      const { data: res } = await this.$http.get(this.currentTabId)
      console.log(res)
      this.currentList = res
      /**
[{
uniquekey: "f1984255b70cc6562179543b4bdf738c"
title: "垂直悬崖上采蜜 他们为何宁被蛰也不戴手套？"
date: "2019-07-30 17:40"
category: "社会"
author_name: "北青网"
url: "http://mini.eastday.com/mobile/190730174022591.html"
thumbnail_pic_s: "http://09imgmini.eastday.com/mobile/20190730/20190730174022_1fb7d9595c27eaf1b660a123238f5af1_1_mwpm_03200403.jpg"
thumbnail_pic_s02: "http://09imgmini.eastday.com/mobile/20190730/20190730174022_1fb7d9595c27eaf1b660a123238f5af1_3_mwpm_03200403.jpg"
thumbnail_pic_s03: "http://09imgmini.eastday.com/mobile/20190730/2019073
}]
    */
    }
  }
}
// export default {
//   // name: 'home',
//   // components: {
//   //   // HelloWorld
//   // },
// }
</script>
<style lang="less" scoped>
// .van-list span {
  // font-size: 0.3rem;
  // columns: #bbb;
  // float: left;
  // text-align: left;
  // padding-left: 1rem;
// }
.dw-cell-label {
  font-size: 0.3rem;
  columns: #bbb;
  // float: left;
  text-align: left;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3rem;
  span {
    padding-left: 1rem;
  }
}
.dw-van-cell-title {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2rem;
  text-align: left;
  margin: 1rem 1rem 0;
  // border-top: 2px solid blue;
}
.van-grid {
  padding: 0 1rem;
  .van-grid-item__content {
    padding: 0rem;
    margin: 0 0.5rem;
  }
  .van-grid-item__content--center {
    padding: 0;
    margin: 0;
  }
}

</style>
