// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// post 请求用到, 安装第三方框架 `npm install body-parser -S`
const bodyParser = require('body-parser');
const fs = require('fs');
// 创建web服务器
const app = express();
// 使用 body-parser 第三方模块
// app.use(bodyParser.urlencoded());
// 将客户端请求参数 转为 json 对象
app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 对应01html文件
app.get('/first', (req, res) => {
    // 向客户端返回数据
    res.send('Hello, Ajax');
});

// 对应02html文件
app.get('/responseData', (req, res) => {
    res.send({ "name": "zs" });
});

// 对应03html文件
app.get('/get', (req, res) => {
    // 将请求参数返回给客户端 会以 json 对象形式返回去
    res.send(req.query);
});

// 对应04html文件
app.post('/post', (req, res) => {
    // post 请求用到
    // const bodyParser = require('body-parser');
    // 就可以用 req.body 获取请求参数
    // 使用 body-parser 第三方模块, 下面才能用
    // app.use(bodyParser.urlencoded());
    res.send(req.body);
});

// 对应05html文件
app.post('/json', (req, res) => {
    // post 请求用到
    // const bodyParser = require('body-parser');
    // 就可以用 req.body 获取请求参数
    // 使用 body-parser 第三方模块, 下面才能用
    // app.use(bodyParser.json());
    // 返回 请求的 json 对象, 
    res.send(req.body);
});

// 对应06html文件
app.get('/readystate', (req, res) => {
    res.send('hello');
});

// 对应07html文件
app.get('/error', (req, res) => {
    // 模拟 服务端返回 500 错误码, 例如: 服务端 
    //console.log(abc); 输出不存在的对象就会给
    // 前端返回 500 错误码
    res.status(400).send('not ok');
});

// 对应08html文件
app.get('/cache', (req, res) => {
    fs.readFile('./test.txt', (err, result) => {
        res.send(result);
    });
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');