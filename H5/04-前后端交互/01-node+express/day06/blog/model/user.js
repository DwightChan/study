// 创建用户集合
// 引入 mongoose 第三方模块
const mongoose = require('mongoose');
// 导入 bcrypt 
const bcrypt = require('bcrypt');
// 引入 joi 模块
const Joi = require('joi');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库的时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin : 超级管理员
    // normal: 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 开启状态
    // 1 禁止状态
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        userName: 'testdw01',
        email: 'testdw01@test.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        userName: Joi.string().min(2).max(12),
        required().console.error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error("邮箱格式不符合要求")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3, 30}$/).required().error(new Error('密码格式不正确')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.string().valid(0, 1).required().error(new Error('状态值非法'))
    }

    // 实施验证
    return Joi.validate(user, schema);
}

// 将用户集合作为模块成员进行导出
module.exports = {
    User: User,
    validateUser = validateUser
}