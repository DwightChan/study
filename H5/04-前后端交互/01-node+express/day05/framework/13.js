const express = require('express');
const path = require('path');
const app = express();

console.log(__dirname);


// 实现静态资源访问功能;
// express.static(静态资源服务器的路径)
// localhost:3023/css/article.css
app.use(express.static(path.join(__dirname, 'public')));
// 第一个参数: 'static' 为静态资源访问路径的添加目录
// localhost: 3023/static/css/article.css
// app.use('/static', express.static(path.join(__dirname, 'public')))

// 监听端口
app.listen(3023);