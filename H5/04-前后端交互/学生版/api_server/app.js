// 引用expess框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-tempate模板引擎
// const template = require('art-template');
// 导入dateformat第三方模块
// const dateFormat = require('dateformat');
// 导入morgan这个第三方模块
// const morgan = require('morgan');
// // 导入config模块
// const config = require('config');
// 创建网站服务器
const app = express();
// // 数据库连接
require('./model/connect');
// 处理post请求参数
// app.use(bodyPaser.urlencoded({ extended: false }));
// 配置session
// app.use(session({
//     secret: 'secret key',
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000
//     }
// }));

// // 告诉express框架模板所在的位置
// app.set('views', path.join(__dirname, 'public'));
// 告诉express框架模板的默认后缀是什么
// app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
// app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormate变量
// template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件 (这样就可以直接通过域名访问该路径下的所有文件)
app.use(express.static(path.join(__dirname, 'public')));

// app.use('', require("./route/index"));
// app.use((err, req, res, next) => {
//         // 将字符串对象转换为对象类型
//         // JSON.parse() 

//     })
// 引入路由模块
require('./route')(app);
// 监听端口
app.listen(80, () => console.log('网站服务器启动成功, 请访问localhost'));