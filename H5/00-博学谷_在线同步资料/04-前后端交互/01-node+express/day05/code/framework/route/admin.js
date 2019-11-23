// 这个文件功能在 08.js 中使用

const express = require('express');

const admin = express.Router();

admin.get('/index', (req, res) => {
    res.send('欢迎来到博客管理页面')
});

module.exports = admin;