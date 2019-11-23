// 引入router模块  `npm install router` 下载 `router` 框架
const getRouter = require('router');
// 获取路由对象
const router = getRouter();
// 学生信息集合
const Student = require('../model/user');
// 引入模板引擎
const template = require('art-template');
// 引入querystring模块 (可以将数据格式转换成对象字符串格式)
const querystring = require('querystring');

// 呈递学生档案信息页面
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
})

// 呈递学生档案信息列表页面 
// async 将函数 变为异步函数
router.get('/list', async(req, res) => {
        // 查询学生信息 异步 查询
        let students = await Student.find();
        console.log(students);
        let html = template('list.art', {
            // 如果这里没值, 可以直接空着
            // 属性: 值
            // students: students
            students: students
        })
        res.end(html)
    })
    // 实现学生信息添加功能路由
router.post('/add', (req, res) => {
    // 接收post请求参数
    let formData = '';
    req.on('data', param => {
        formData += param;
    });
    req.on('end', async() => {
        // 解析数据成为一个对象 异步插入数据库
        await Student.create(querystring.parse(formData));
        // 返回 301 重定向跳转进入到 list 页面
        res.writeHead(301, {
            Location: '/list'
        });
        // 响应结束
        res.end()
    })
});

module.exports = router;