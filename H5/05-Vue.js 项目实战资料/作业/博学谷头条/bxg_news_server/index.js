const express = require('express')
const app = express()
// 导入路由
const router = require('./router/router.js');
// 引入跨域插件
const cors = require('cors')

// 配置跨域
app.use(cors())
// 配置路由
app.use(router);

// 监听端口
app.listen(3001, () => {
    console.log('runing http://127.0.0.1:3001');
})
