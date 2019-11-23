// 1.引入mongoose模块
const mongoose = require('mongoose');

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        // 第一参数: 是否必填
        // 第二参数: 错误信息
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // 必填作者
        // 错误信息提示内容
        required: [true, '请传递作者']
    },
    // 发布时间
    publishDate: {
        // 
        type: Date,
        // 如果用户没有填写时间, 就是用当前时间
        default: Date.now
    },
    // 文章 封面
    cover: {
        type: String,
        // 没有封面就默认为空
        default: null
    },
    content: {
        // 文章内容
        type: String
    }
});

// 3.根据规则 创建集合
const Article = mongoose.model('Article', articleSchema);

// 4.将集合做为模块成员进行导出
module.exports = {
    // Article: Article 
    // 属性和值相同 可以简写
    // Article 
    Article
}