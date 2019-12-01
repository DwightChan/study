// 导入文章集合狗仗函数
const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 接收到客户端传递过来的文件 id 值
    // 根据 id 查询文章详情信息
    // 查询当前文章所对应的评论信息
    const id = req.query.id;
    let article = await Article.findOne({ _id: id }).populate('author');
    let comments = await Comment.find({ aid: id }).populate('uid');

    console.log("当前 id 是:" + id, article, comments);
    res.send('欢迎来到博客文章详情页面');
}