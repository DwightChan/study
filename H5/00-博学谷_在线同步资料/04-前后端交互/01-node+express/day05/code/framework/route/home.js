// 这个文件功能在 08.js 中使用

const express = require('express');

const home = express.Router();

home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页页面')
});

module.exports = home;