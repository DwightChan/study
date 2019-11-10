// 1.通过 模块的名字fs 对模块进行引用
const fs = require('fs');

// 2. 通过模块内部的 readFile 读取文件内容
fs.readFile('./01.helloworld.js', 'utf8', function(err, doc) {
    // 如果文件读取出错err 是一个对象 包含错误信息
    // 如果文件读取正确 err是 null
    // doc 是文件读取的结果
    console.log(err);
    console.log(doc);
});