// 引入 joi 模块
const Joi = require('joi');

// 定义对象的验证规则
const schema = {
    // 字符串类型, 最小长度为 2, 最大长度为 4, required: 必传参数
    username: Joi.string().min(2).max(5).required().error(new Error('username 属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))
};

async function run() {
    try {
        // 实施验证
        await Joi.validate({ username: 'as12', birth: 2019 }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}

run();