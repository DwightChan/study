// 1. 引入 mongoose 模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');

// 2. 创建课程集合 规则
const courseSchema = new mongoose.Schema({
    /*
    {"_id":{"$oid":"5d246cdd64d3e54ba11c8926"},
    "name":"【前端】就业班",
    "count":{"$numberInt":"300"},
    "price":"14980",
    "img":"http://127.0.0.1:3001/images/FE.png",
    "__v":{"$numberInt":"0"}
    }
    title: {
		type: String,
		maxlength: 20,
		minlength: 4,
		required: [true, '请填写文章标题']
	}
    */
    name: {
        type: String,

    }

})