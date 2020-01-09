<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>
// <!-- scoped 指令表示 下面的less 只对当前文件生效 -->
</style>
