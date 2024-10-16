const express = require('express');
const path = require('path');
const app = express();
// 模板配置
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art');
//  这里添加到 app.locals 中之后就可以直接在模板中使用 users 这个属性
app.locals.users = [{
    name: 'zhangsan',
    age: 20
}, {
    name: '李四',
    age: 30
}]

app.get('/index', (req, res) => {
    res.render('index', {
        msg: '首页'
    })
});

app.get('/list', (req, res) => {
    res.render('list', {
        msg: '列表页'
    });
})


// 端口监听
app.listen(3026);