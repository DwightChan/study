// 引入 express 框架
// 安装 框架 `npm install express`
const express = require('express');
// 创建网站服务器
const app = express();
// 默认匹配到第一个就不在往下匹配, 所以在第二个参数 中的 要加第三个参数 next
// 第一个参数: 请求接口(包含 链接)
// 第二个参数: 有三个参数
// 1: 请求参数
// 2. 返回参数
// 3. next : 是一个方法 中间件: 允许向下传递
app.get('/request', (req, res, next) => {

    console.log("234");
    req.name = "张三";
    next();
});

app.get('/request', (req, res) => {
    console.log("sfasd");

    res.send(req.name);
});

// 监听 端口
app.listen(3012);
console.log('网站服务器启动成功');