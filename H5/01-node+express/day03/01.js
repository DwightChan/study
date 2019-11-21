// 引用 mongoose 第三方模块 用来操作数据库
const = mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    // 连接成功
    .then(() => Console.log('数据库连接成功'))
    // 连接失败
    .catch(err => Console.log(err, "数据库连接失败"));