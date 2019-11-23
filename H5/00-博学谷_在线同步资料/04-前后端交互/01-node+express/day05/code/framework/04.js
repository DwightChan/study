// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

// 网站公告 一般用于维护状态
// app.use((req, res, next) => {
// 	res.send('当前网站正在维护...')
// })

app.use('/admin', (req, res, next) => {
    // 用户没有登录
    let isLogin = true;
    // 如果用户登录
    if (isLogin) {
        // 让请求继续向下执行
        next()
    } else {
        // 如果用户没有登录 直接对客户端做出响应
        res.send('您还没有登录 不能访问/admin这个页面')
    }
})

app.get('/admin', (req, res) => {
    res.send('您已经登录 可以访问当前页面')
})

// 找不到该路由的时候 返回 404, 一般是写在最后面
app.use((req, res, next) => {
    // express 默认状态码是 200 , 所以我们要设置为 404 状态
    // 为客户端响应404状态码以及提示信息
    res.status(404).send('当前访问的页面是不存在的')
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');