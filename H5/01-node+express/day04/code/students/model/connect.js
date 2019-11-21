const mongoose = require('mongoose');

//  链接数据库
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))


// mongoose.connect('mongodb://user:password@sample.com:port/dbname', { useNewUrlParser: true })