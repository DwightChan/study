// 引入express框架
const express = require('express');
const fs = require('fs');
// 创建网站服务器
const app = express();

// 程序发生错误的时候回执行后面的 方法; 
app.get('/index', (req, res, next) => {
    // 程序发生错误的时候回执行后面的 方法; 
    // throw new Error('程序发生了未知错误')
    fs.readFile('./01.js', 'utf8', (err, result) => {
        if (err != null) {
            // 传给错误处理函数 
            next(err)
        } else {
            res.send(result)
        }
    })

    // res.send('程序正常执行')
})

// 错误处理中间件, 有四个参数
// 错误对象,
// 请求对象, 
// 响应对象, 
// next 方法
app.use((err, req, res, next) => {
    // 将错误信息传给前端
    res.status(500).send(err.message);
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');