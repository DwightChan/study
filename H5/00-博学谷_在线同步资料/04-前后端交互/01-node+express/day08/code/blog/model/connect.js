// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 连接数据库
//                   mongodb://用户名:密码@localhost:端口号/数据库名称
// mongoose.connect('mongodb://user:pass@localhost:port/database')`
mongoose.connect('mongodb://itcast:itcast@localhost:27017/blog', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))