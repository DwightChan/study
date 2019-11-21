/** 
搭建网站服务器, 实现客户端与服务器的通信
连接数据库, 创建用户集合, 想集合中插入文档
当用户访问/list 时, 将所有的用户信息查询出来
事项路由功能
呈现用户列表页面
从数据库中查询用户信息, 将用户信息展示在列表中
当用户访问/add 时, 呈现表单页面, 并实现添加用户信息功能
当用户访问/modify 时, 呈现修改页面, 并实现修改用户信息;
用户信息分为两个大步骤:
1. 增加页面路由 呈现页面
    1.1 在点击按钮的时候, 将用户 id 传递到当前页面
    1.2 从数据库中查询当前用户信息, 将用户信息展示在页面中
2. 实现用户修改功能
    2.1 指定表单的提交地址以及请求地址
    2.2 接收客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
当用户范文到/delete 时, 实现用户删除功能;
*/

const http = require("http");
const url = require('url');
const querystring = require('querystring');

require('./model/index.js');
const User = require('./model/user');

// 创建服务器
const app = http.createServer();

// 为服务器添加对象请求事件
app.on('request', async(req, res) => {
    // 请求方式
    const method = req.method;
    // 请求 地址
    req.parse(req.url, req.true)
});
// 监听端口
app.listen(3000);
console.log('服务器启动成功');