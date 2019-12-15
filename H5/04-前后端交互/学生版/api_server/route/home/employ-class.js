// 就业课 列表数据
// Course: 集合
// validateCourse: 验证规则
const { Course, validateCourse } = require('../../model/course');

module.exports = async(req, res) => {
    console.log('进入请求');

    // // const course = await Course.find()
    // // 接收客户端传递来的当页参数
    // let page = req.query.page || 1;
    // // 每一页显示的数据条数
    // let pageSize
    let courseList = await Course.find({});
    res.send(courseList);
}