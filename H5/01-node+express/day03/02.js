// 引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    // 连接成功
    .then(() => console.log("数据库连接成功"))
    // 连接失败
    .catch(err => console.log("数据连接失败"));

// 创建集合规则
const coursetSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 使用规则创建集合
// 1. 集合名称
// 2. 集合规则
const Course = mongoose.model('Course', coursetSchema);

// 创建文档
const course = new Course({
    name: 'node.js 基础',
    author: '黑马',
    isPublished: true
});

// 将文档插入数据库中