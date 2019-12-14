// 路由集合
module.exports = app => {

    // 首页 UI 显示
    app.use("/", require("./home/home"));
    app.use('', require("./home/home"))
};