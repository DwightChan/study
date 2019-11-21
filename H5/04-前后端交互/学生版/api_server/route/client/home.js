// module.exports = async(req, res) => {
//     // 获取 数据

//     console.log(123);

//     // console.log(req);
//     // 将请求参数返回给前端
//     res({ "test": 123, "test123": "123qwe" });
// };

// 引入 express 框架
<<<<<<< HEAD
const express = require('express');
// 创建首页路由
const home = express.Router();

// 客户端首页展示
home.get('/home', require('./home/index'));
=======
const exports = require('express');
// 创建首页路由
const home = exports.Router();

// 客户端首页展示
home.get('/', require('./home/index'));
>>>>>>> 92157e5665af1695e336ebeaf755a5021da6668b

// 将路由对象作为模块成员进行导出
module.exports = home;