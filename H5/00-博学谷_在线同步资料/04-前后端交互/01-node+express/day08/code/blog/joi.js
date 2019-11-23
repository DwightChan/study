// 引入joi模块 安装框架 `nmp install joi`
const Joi = require('joi');

// 定义对象的验证规则
const schema = {
    // .error 是自定义错误信息, 如果不写就是框架自身的错误提示, 如果写就是自定义错误信息提示;
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
};

async function run() {
    try {
        // 实施验证
        await Joi.validate({ username: 'ab', birth: 1800 }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过')

}

run();