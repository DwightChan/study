// 引入 express 框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入 body-parser 模块 用来处理 post 请求参数
const bodyPaser = require('body-parser');
// 导入 express-session 模块
const session = require('express-session');
// 导入 art-template
const template = require('art-template');
// 导入 dateFormat 第三方引擎
const dateFormat = require('dateformat');
// 导入 morgan 第三方框架
const morgan = require('morgan');
// 导入 config 模块
const config = require('config');

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
}));

// 告诉 express 框架模板所在的位置 在 render 方法渲染的时候直接调用 .art 文件名即可
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
// 拼接绝对路径 path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由模块 (.js 可以省略)
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断用户是否登录
app.use('/admin', require('./middleWare/loginGuard'));
// 为路由匹配请求路径, 匹配之后会在对应文件中执行出来程序
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse() 
    const result = JSON.parse(err);
    // {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

// 监听端口, 开发可以使用任意端口, 一般写 3000 端口
// 上线一般使用 80 端口, 因为 80 端口会在浏览器中自动添加
app.listen(3027);
console.log('网站服务器启动成功, 请访问localhost 3026');