// 1. 引入 mongoose 模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');
const http = require('http');
const URL = require('url');

// 2. 创建课程集合 规则
const courseSchema = new mongoose.Schema({
    /*
    "_id":{
            "$oid":"5d246c4b0b00e74af45f6093"
        },
        "name":"【前端】微信小程序",
        "count":{
            "$numberInt":"20"
        },
        "price":"199",
        "img":"http://127.0.0.1:3001/images/wx.jpg",
        "__v":{
            "$numberInt":"0"
        }
    */
    oid: { // 自定义 id 后续用于查找是否已经有该 id 从而确定是否要添加
        type: String,
        required: false
    },
    name: {
        type: String,
        maxlength: 20,
        minlength: 1,
        // 是否为必填
        // 第一个参数: 是否为必填参数: true 必填, false 非必填
        // 第二个参数: 错误提示信息;
        required: [true, "请输入课程名称"]
    },
    price: { // 价格
        type: String,
        default: "免费",
        required: false
    },
    img: {
        type: String,
        required: false
    },
    count: {
        type: Number,
        default: 0,
        required: false
    },
    __v: {
        type: Number,
        default: 0,
        required: false
    }
});

// 3. 根据规则 创建集合
// 第一个参数: 集合名称
// 第二个参数: 集合规则
const Course = mongoose.model("Course", courseSchema);

// 导入 data.json 课程
async function addDefaultDatas() {

    // 1. 引入读取文见的框架
    const fs = require('fs');
    // 2. 通过模块内部的 readFile 读取文件内容
    fs.readFile("./data.json", 'utf8', (err, doc) => {
        // 如果文件读取出错err 是一个对象 包含错误信息
        // 如果文件读取正确 err是 null
        // doc 是文件读取的结果
        // console.log(err);
        if (doc) { // 获取成功 
            // console.log(doc);
            let arr = JSON.parse(doc);
            // console.log(arr);
            arr.forEach(element => {
                // console.log("---------------" + JSON.stringify(element));
                checkAndAdd(element)
            });
        }
    });
}
// 检查是否可以添加
async function checkAndAdd(obj) {

    let course = await Course.findOne({ oid: obj._id["$oid"] });
    if (!course) {
        /*
		 "_id":{
            "$oid":"5d246c4b0b00e74af45f6093"
        },
        "name":"【前端】微信小程序",
        "count":{
            "$numberInt":"20"
        },
        "price":"199",
        "img":"http://127.0.0.1:3001/images/wx.jpg",
        "__v":{
            "$numberInt":"0"
		}
		 */
        var imgStrArr = obj.img.split('/images/')
        var imgUrl = URL.parse(obj.img);
        // console.log(http + "location");
        // console.log("port:" + imgUrl.port);

        // console.log(typeof(imgUrl.port));
        // console.log(imgStrArr.length);

        if ((imgStrArr.length >= 1) && (imgUrl.port != "80")) {
            // console.log(obj.img + "--------");
            obj.img = "http://127.0.0.1:80" + "/images/" + imgStrArr[1];
            // console.log(obj.img + "++++++++");
        }
        console.log(JSON.stringify(obj));

        // 添加数据
        const course = await Course.create({
            name: obj.name,
            price: obj.price,
            img: obj.img,
            count: obj.count["$numberInt"],
            oid: obj._id["$oid"],
            __v: obj.__v["$numberInt"]
        });
    } else {
        // console.log("数据库已经存在该数据");
        // console.log(JSON.stringify(obj));
    }
}
addDefaultDatas();
// 验证课程信息
const validateCourse = Course => {
    // 定义对象的验证规则
    const schema = {
        name: Joi.string().min(1).max(20).required().error(new Error('课程名称不正确'))
    };
    // 实施验证
    return Joi.validate(user, schema);
}

// 将课程集合作为模块成员进行导出
module.exports = {
    Course, // 集合
    validateCourse // 验证规则
}