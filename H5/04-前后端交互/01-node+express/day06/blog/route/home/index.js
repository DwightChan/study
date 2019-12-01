const { Article } = require('../../model/article');

// 导入分页模式
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 获取页面值
    var page = req.query.page;

    console.log('当前页码是: ' + page);
    // 从数据库中查询数据
    if (page == 'undefined' || page == undefined) {
        page = 1;
    }
    console.log('当前页码是: ' + page);
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();

    // res.send('欢迎来到博客首页')
    // 渲染模板并传递数据
    res.render('home/default.art', {
        // 传递数据
        result: result
    });
}