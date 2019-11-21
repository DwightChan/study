const fs = require('fs');
const path = require('path');

console.log(__dirname);
// 输入绝对路径
console.log(path.join(__dirname, '01.helloworld.js'));

// 根据绝对路径读取文件内容
fs.readFile(path.join(__dirname, '01.helloworld.js'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
});