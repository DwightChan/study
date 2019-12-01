// 1. 引入 mongoose 模块
const mongoose = require('mongoose');

// 2. 创建文章集合规则
const articleSchema = new mongoose.Schema({
    // 文章标题
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true, "填写文章标题"]
    },
    // 作者
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, '请传递作者']
    },
    // 发版时间
    publisDate: {
        type: Date,
        default: Date.now
    },
    // 封面
    cover: {
        type: String,
        default: null
    },
    // 内容
    content: {
        type: String
    }
});

// 3. 根据规则创建合集
const Article = mongoose.model('Article', articleSchema);

// 4. 将集合作为模块成员进行导出
module.exports = {
    Article: Article
}