const express = require('express');
const path = require('path');
const app = express();

// 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
//  1.模板后缀
//  2.使用的模板
app.engine('art', require('express-art-template'))
    // 2.告诉express框架模板存放的位置是什么
    // __driname 是绝对路径
    // 第一参数: 是固定的 express 框架命名
    // 第二参数: 是模板存放路径
app.set('views', path.join(__dirname, 'views'))
    // 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');

app.get('/index', (req, res) => {
    // render 是渲染模板, 做了以下功能:
    // 1. 拼接模板路径
    // 2. 拼接模板后缀
    // 3. 哪一个模板和哪一个数据进行拼接
    // 4. 将拼接结果响应给了客户端
    res.render('index', {
        msg: 'message'
    })
});

app.get('/list', (req, res) => {
    // 使用 list.art 模板, 前面已经向系统声明过模板后缀(.art), 所以后缀可以不写, 
    res.render('list', {
        msg: 'list page'
    })
})


// 端口监听
app.listen(3000);