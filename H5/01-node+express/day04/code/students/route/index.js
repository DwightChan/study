// 引入 router 模块    `npm install router` 下载 `router` 框架
const getRouter = require('router');
// 获取路由对象
const router = getRouter();
// 学生信息集合
const Student = require('../model/user');
// 引入模板引擎 , 安装: 终端在项目目录下 `npm install art-template`
const template = require('art-template');
// 引入 querystring 模块 (可以将数据格式转换为了对象字符串格式)
const querystring = require('querystring');

// 呈递学生档案信息页面
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
})

//  呈递学生档案信息列表页面
// async 将函数 变为异步函数
router.get('/list', async(req, res) => {
    // 查询学生信息, 异步 查询
    console.log('list 列表请求')
    let students = await Student.find();
    // console.log("学生信息获取", students);
    let html = template('list.art', {
        students: students
    })
    console.log(html);
    res.end(html);
});

// 实现学生信息添加功能路由
router.post('/add', (req, res) => {
    // 接收 post 请求参数
    let formData = '';
    req.on('data', param => {
        // console.log('当前添加学习数据功能参数', param);
        formData += param;
    });
    req.on('end', async() => {
        // 解析数据成为一个对象, 异步插入数据库
        console.log('重定向到 list 列表')
        await Student.create(querystring.parse(formData));
        // 返回 301 重定向 跳转进入到 list 页面
        res.writeHead(301, {
            Location: '/list'
        });
        console.log('重定向成功')
            // 响应结束
        res.end();
    });
});

module.exports = router;