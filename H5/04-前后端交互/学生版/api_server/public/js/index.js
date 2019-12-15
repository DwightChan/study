// const artTemplate = require("art-template");

// import { template } from "express-art-template";
// 导入art-tempate模板引擎
// const template = require('art-template');
$.ajax({
    // 请求地址
    url: '/home/employ-class',
    // 请求方式
    type: 'get',
    // 请求成功之后回调函数
    success: function(response) {

        console.log(response instanceof Array);
        // 注意 这个模板名称不要和 id 相同
        var html = template('employ-Class', { data: response });
        $('#employClass').html(html);
    },

    // 请求失败函数回调
    error: function(xhr) {
        console.log(xhr);
    }
});