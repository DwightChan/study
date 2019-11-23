// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块, 安装模块`npm install mongoose-sex-page`
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 接收客户端传递过来的页码 (req.query.参数 : 是 get 请求的参数) 
    const page = req.query.page;
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // page 指定当前页
    // suze 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量 例如: 一共有 10 页, 这里设置显示的也是是 3, 当前页码是 5 , 则只显示 4 5 6 三个页码;
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    // 联合数据查询, 比如在文章数据对象中有作者对象作为属性, 只要后面`.populate(查询属性)`即可
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    // 直接给客户端返回数据
    // res.send(articles);

    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles: articles
    });
}