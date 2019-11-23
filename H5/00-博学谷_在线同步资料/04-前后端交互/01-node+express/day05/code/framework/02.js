// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 默人匹配到第一个就不再往下匹配了, 所以在第二个参数要加第三个参数 next
// 第一个请求参数: 请求接口 路由
// 第二个请求参数: 有三个参数
// 1: 请参数
// 2: 返回方法
// 3. next: 是一个方法, 中间件: 允许向下传递
app.get('/request', (req, res, next) => {
    req.name = "张三";
    next();
})

app.get('/request', (req, res) => {
    res.send(req.name)
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');