// 引入 express 框架
// 安装 框架 `npm install express`
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/', (req, res) => {
    // send();
    // 1. send 方法内部会检查响应内容的类型
    // 2. send 方法会自动设置 http 状态
    // 3. send 方法会帮自动设置响应的内容类型以及编码
    res.send('hello . express');
});

app.get('/list', (req, res) => {
    res.send({ name: '张三', age: 20 })
});

// 监听端口
app.listen(3011);
console.log('网站服务器启动成功');