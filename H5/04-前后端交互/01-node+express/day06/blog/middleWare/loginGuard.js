const guard = (req, res, next) => {
    // 判断用户访问是否是登录状态
    // 判断用户的登录状态
    // 如果用户登录的 请求放行
    // 如果用户为登录 将请求中定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 用户已经登录状态, 请求放行;
        next();
    }
}

module.exports = guard;