const express = require('express');
const path = require('path');
const app = express();

// 模板配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
// 声明模板引擎后缀
// 注意下面的 `view engine` 是固定写法, 是视图引擎 和 `views 文件夹`没有关系
app.set('view engine', "art");
// 这里添加 app.locals 中之后就可以直接在模板中使用 users 这个属性
// users 在模板中用到
app.locals.users = [{
    name: '张三',
    age: 20
}, {
    name: '李四',
    age: 30
}];

app.get('/index', (req, res) => {
    res.render('index', {
        msg: '首页'
    });
});

app.get('/list', (req, res) => {
    res.render('list', {
        msg: '列表页面'
    });
});

// 端口监听
app.listen(3025);