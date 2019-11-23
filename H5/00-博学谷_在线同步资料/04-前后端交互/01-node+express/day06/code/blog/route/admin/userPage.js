// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据的总数
    // 这里 countDocuments 方法不添加查询条件, 表示所有数据都要查出来
    let count = await User.countDocuments({});
    // 总页数 向上取整
    let total = Math.ceil(count / pagesize);

    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    // limit 方法: 是表示限制一次性查询条数
    // skip 方法: 表示跳过多少条
    let users = await User.find({}).limit(pagesize).skip(start)
        // 渲染用户列表模块
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}