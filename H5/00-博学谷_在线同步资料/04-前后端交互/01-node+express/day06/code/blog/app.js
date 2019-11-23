// 引用expess框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

// 开放静态资源文件
// 拼接绝对路径ath.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, 'public')))

// 引入路由模块 (.js 都可以省略)
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径, 匹配上之后 会在对应文件中执行出来程序
app.use('/home', home);
app.use('/admin', admin);

// next 里面的参数 返回值 就是 err
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse() 
    const result = JSON.parse(err);
    res.redirect(`${result.path}?message=${result.message}`);
})

// 监听端口, 开发可以使用任意端口, 一般写 3000, 上线一般使用 80端口, 因为 80 会在浏览器中自动添加
app.listen(80);
console.log('网站服务器启动成功, 请访问localhost')