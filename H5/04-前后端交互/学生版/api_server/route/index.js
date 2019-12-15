// // 首页路由集合
// const express = require('express');
// // 创建博客首页占时页面路由
// const index = express.Router();

// index.use("/home/employ-class", require('./home/employ-class'));

// module.exports = index;

module.exports = app => {
    // app.use('/', require('/index.html'))
    app.use('/home/employ-class', require('./home/employ-class'));
};