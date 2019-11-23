const express = require('express');
const path = require('path');
const app = express();

// 实现静态资源访问功能
// express.static(静态资源服务器的路径))
// localhos:3000/css/article.css
app.use(express.static(path.join(__dirname, 'public')))
    // 第一个参数: "/static" 为静态资源访问路径的添加目录
    // localhos:3000/static/css/article.css
    // app.use('/static', express.static(path.join(__dirname, 'public')))

// 端口监听
app.listen(3000);