// 1. 引用系统模块 http
// 2. 创建网站服务器
// 3. 为网站服务器对象添加请求事件
// 4. 实现路由功能
// 1. 获取客户端的请求方式
// 2. 获取客户点的请求地址

const http = require('http');
const url = require('url');

const app = http.createServer();

app.on("request", (req, res) => {
    // 获取请求方式
    const method = req.method.toLowerCase();
    // 获取请求地址
    const pathName = url.parse(req.url).pathname;
    console.log("测试氨基酸快递费决胜巅峰");

    // 
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    });

    if (method == 'get') {
        // get 请求
        if ((pathName == "/") || (pathName == '/index')) {
            res.end('欢迎来到首页');

        } else if (pathName == "/list") {
            res.end('欢迎来到列表页');
        } else {
            res.end('您访问的页面不存在');
        }
    } else if (method == 'post') {
        // post 请求
    }
});
app.listen(30001, () => {
    console.log("服务器启动成功 localhost");

});
console.log('服务器启动成功')