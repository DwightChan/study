// 引入express框架
const express = require('express');
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();

// 客户端请求要传参有 id name age
// localho:3000/index/200/zhangsan/19
app.get('/index/:id/:name/:age', (req, res) => {
    // 接收post请求参数
    res.send(req.params)
})

// 端口监听
app.listen(3000);