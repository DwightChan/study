// 引入 mongoose 第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库链接
mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true
    })
    // 链接成功
    .then(() => console.log('数据库连接成功'))
    // 链接失败
    .catch(() => console.log(err, '数据库连接失败'));

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: true
});

// 使用规则创建集合
// 1. 集合名词
// 2. 集合规则
const Course = mongoose.model('Course', courseSchema);

// 向集合中插入文档
// Course.create({ name: 'javaScript', author: '黑马', isPublished: false}, (err, result) => {
//     console.log(err);
//     console.log(result);
// });

Course.create({ name: 'javascript123', author: '黑马', isPublished: false })
    .then(() => {
        console.log(result);
    });