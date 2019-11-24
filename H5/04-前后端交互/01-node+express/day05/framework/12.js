// 引入 express 框架
const express = require('express');
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();
// 客户端请求传参有 id name age
// localhost:3021/index/200/zhangsan/19
app.get('/index/:id/:name/:age', (req, res) => {
    // 接收 post 请求参数
    res.send(req.params);
});

// 端口监听
app.listen(3021);