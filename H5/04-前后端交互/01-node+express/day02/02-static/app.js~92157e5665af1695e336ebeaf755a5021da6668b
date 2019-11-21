// 用于创建网站服务器的模块
const http = require('http');
// 用于处理url地址
const url = require('url');
// 
const path = require('path');
//
const fs = require('mime');

// app对象就是网站服务器对象
const app = http.createServer(); 

// 当客户端有请求来的时候
app.on('request', (req, res) => {
    
    // 获取用户的请求路径
    let pathName = url.parse(req.url).pathname;
    console.log(pathName);
    
    pathName = pathName == "/" ? "/default.html" : pathName;

    // 将用户的请求路径转换为实际的服务器硬盘路径
    let realPath = pathName.join(__dirname, "path" + pathName);

    let type = mime.getType(realPath);

    // 读取文件
    fs.realFile(realPath, (error, result) => {
        // 如果文件读取失败
        if (error != null) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf8'
            });
            res.end('读取文件失败');
            return;
        }

        res.writeHead(200, {
            'content-type': type
        })

        res.end(result);
    })

});
// 监听端口
app.listen(3002);
console.log('网站服务器启动成功');