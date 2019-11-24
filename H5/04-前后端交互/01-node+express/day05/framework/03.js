// 引入 express 框架
const express = require('express');
// 创建网站服务器
const app = express();
// express().use 方法可以 匹配 get/post 请求
// 该方法没有写路由参数, 则表示任何路由都经过改地方
// 该方法如果有写路由参数, 则根据路由区分
// 接收所有请求的中间件
// next 参数是个方法, 表示 将控制器交给下个中间件
app.use((req, res, next) => {
    console.log('请求经过 app.use 中间件');
    next();
});

// 客户端访问/ request 请求的时候走当前中间件
app.use('/request', (req, res, next) => {
    console.log('请求经过该 app.use / request 中间件');
    next()
});

app.get('/list', (req, res) => {
    res.send("/list");
});

app.get('/request', (req, res, next) => {
    req.name = "李四";
    next();
});

app.get('/request', (req, res) => {
    res.send(req.name);
});
// 监听端口
app.listen(3012);
console.log('网站服务器启动成功');