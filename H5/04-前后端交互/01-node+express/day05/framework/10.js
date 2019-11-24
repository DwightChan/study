// 本案例需要 post.html 配合

// 引入 express 框架
const express = require('express');
// 引入 body-parser 模块 `npm install body-parser`
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();
// 拦截所有请求
// extended: false 方法内部使用系统模块 querystring 模块处理请求参数的格式
// extended: true 方法内部使用第三方模块 qs 处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/add', (req, res) => {
    // 接收到 post 请求参数
    res.send(req.body);
});

// 端口监听
app.listen(3019);
// 使用 post.html 文件做客户端 post 请求;