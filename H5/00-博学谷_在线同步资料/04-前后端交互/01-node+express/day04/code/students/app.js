// 引入http模块
const http = require('http');
// 引入模板引擎 在终端 先安装模板引擎 到项目中 `npm install art-template`
const template = require('art-template');
// 引入path模块
const path = require('path');
// 引入静态资源访问模块  安装 `npm install serve-static`
const serveStatic = require('serve-static');
// 引入处理日期的第三方模块 `npm install dateformal`
const dateformat = require('dateformat');
// 引入 router 文件 就可以使用 router 相关的功能了
const router = require('./route/index');
// 实现静态资源访问服务, 需要调用返回值启用静态资源访问服务功能
// __dirname: 获取当前文件的绝对路径
// 'public': 是静态资源服务器的相对路径
// return 静态资源服务 
const serve = serveStatic(path.join(__dirname, 'public'))

// 配置模板的根目录
template.defaults.root = path.join(__dirname, 'views');
// 处理日期格式的方法  安装: 终端进入在项目文件夹下`npm install dateformal`
template.defaults.imports.dateformat = dateformat;

// 数据库连接
require('./model/connect');

// 创建网站服务器
const app = http.createServer();
// 当客户端访问服务器端的时候, 事件处理行数
app.on('request', (req, res) => {
    // 启用路由功能
    router(req, res, () => {});
    // 启用静态资源访问服务功能
    serve(req, res, () => {});
});
// 端口监听
app.listen(80);
console.log('服务器启动成功');