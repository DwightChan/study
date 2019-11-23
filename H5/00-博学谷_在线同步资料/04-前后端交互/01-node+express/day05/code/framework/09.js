// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/index', (req, res) => {
    // 获取get请求参数
    // express 框架已经将请求参数转为对象,
    // 这里写法是将请求参数转换成的对象直接返回
    res.send(req.query)
})

// 端口监听
app.listen(3000);