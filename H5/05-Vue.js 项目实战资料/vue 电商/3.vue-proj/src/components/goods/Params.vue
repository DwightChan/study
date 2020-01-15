<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类: </span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            max-height="80%"
            v-model="selectedCateKeys"
            :props="cateProps"
            @change="handleChange"
            :options="catelist"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 动态参数的按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
          <el-table :data="manyTableData" border=" stripe">
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable>{{item}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 指定级联选择器的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 选中的分类的Id数组
      selectedCateKeys: [],
      // 被集火的页签的名称
      activeName: 'many',
      // 动态参数的数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', tigger: 'blur' }
        ]
      },
      // 控制修改对话框的显示与隐藏
      editDialogVisible: false,
      // 修改的表单数据对象
      editForm: {},
      // 修改的表单验证规则对象
      additFormRules: {
        attr_name: [
          { required: true, methods: '请输入参数名称', tigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log('分类参数页面')
    this.getCatList()
  },
  methods: {
    // 获取所有的商品分类列表
    async getCatList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败!')
      }
      this.catelist = res.data
      console.log(this.catelist)
      this.$message.success(res.meta.msg)
    },
    // 级联选择器选中项变化, 会催发这个函数
    handleChange() {
      // console.log(this.catelist);
      this.getParamsData()
    },
    // tab 页签点击事件的处理函数
    handleTabClick() {
      console.log(this.activeName)
      this.getParamsData()
    },
    // 获取参数的列表数据
    async getParamsData() {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }

      // 证明选中的是三级分类
      console.log(this.selectedCateKeys)
      // 根据所选分类的 id, 和当前所处的面板, 获取对应的参数
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error('获取参数列表失败!')
      }
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        // 控制文本框的显示与隐藏
        item.inputVisible = false
        // 文本框中输入的值
        item.inputValue = ''
      })

      console.log(res.data)
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    }
  },
  computed: {
    // 如果按你需要被禁用, 则返回 true, 否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return true
    },
    // 当前选中的三级分类的id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
