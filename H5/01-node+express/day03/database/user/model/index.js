const mongoose = require('mongoose');
// 数据库链接 27017 是 mongodb 数据库的默认端口号
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));