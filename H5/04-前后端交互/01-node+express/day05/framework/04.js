// 引入 express 框架
const express = require('express');
// 创建网站服务器
const app = express();

// // 网站公告 一般用于维护状态
// app.use((req, res, next) => {
//     res.send('当前网站正在维护中...');
// });


app.use('/admin', (req, res, next) => {
    // 用户登录状态
    let isLogin = false; //true;
    if (isLogin) {
        // 让请求继续向下执行
        next();
    } else {
        // 如果用户没有登录直接对用户做出响应
        res.send('您还没有登录, 不能访问/admin 这个页面');
    }
});

app.get('/admin', (req, res) => {
    res.send('您已经登录 可以访问当前页面');
});

// 找不到该路由的时候, 返回 404 , 一般是写在最后面
app.use((req, res, next) => {
    // express 默认状态码四 200, 所以我们要设置为 404状态
    // 为客户端响应 404 状态码已经提醒信息
    res.status(404).send('当前访问的页面不存在');
});

app.listen(3013);
console.log('网站服务器启动成功');