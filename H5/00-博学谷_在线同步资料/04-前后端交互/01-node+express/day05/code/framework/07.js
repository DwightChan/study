// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 创建路由对象
const home = express.Router();
// 为路由对象匹配请求路径
// 创建一级路由 /home 
app.use('/home', home);
// 创建二级路由
home.get('/index', (req, res) => {
        res.send('欢迎来到博客首页页面')
    })
    // 客户请求的时候要用到一级路由/二级路由 才能访问
    // 例如: ../home/index
    // 端口监听
app.listen(3000);