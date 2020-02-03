<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词">
      <div slot="action" @click="onSearch(value)">搜索</div>
    </van-search>
    <p class="recommend">猜你喜欢</p>
    <div class="recommendItem">
      <van-button
        v-for="(title, index) in recommendTitles"
        :key="index"
        @click="btnClick(index)"
        >{{title}}</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 搜索关键字
      value: '',
      showAction: false,
      // 猜你喜欢的关键词
      recommendTitles: ['12', '123qwe', '阿双方均对', '奥斯卡的风景', '卡萨丁放假啊是', 'UI一问', '12', '123qwe', '阿双方均对', '奥斯卡的风景', '卡萨丁放假啊是', 'UI一问']
    }
  },
  methods: {
    // 搜索内容
    onSearch(val) {
      this.$toast('搜索的关键字是:' + val)
      // this.$toast('提示内容')
    },
    btnClick(index) {
      this.value = this.recommendTitles[index]
      // this.showAction = true
    }
  }
}
</script>
<style lang="less" scoped>
.recommend {
  font-size: 0.5rem;
  color: #171F3E;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  margin: 0;
}
.recommendItem {
  margin-top: 0.5rem;
  // 转为 flex 布局
  display: flex;
  // 允许换行
  flex-wrap: wrap;

  .van-button {
    border: none;
    // height: 2rem;
    font-size: 1rem;
    align-content: left;
    // padding: 0 0.5rem;
  }
}
</style>
