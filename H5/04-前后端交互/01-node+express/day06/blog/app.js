// 引入 express 框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入 body-parser 模块 用来处理 post 请求参数
const bodyPaser = require('body-parser');
// 导入 express-session 模块
const session = require('express-session');
// 创建网站服务器
const app = express();
// 数据库链接
require('./model/connect');
// 处理 post 请求参数
app.use(bodyPaser.urlencoded({
    extended: false
}));
// 配置 session 
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))