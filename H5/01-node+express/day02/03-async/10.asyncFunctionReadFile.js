const fs = require('fs');
// 该着现有异步函数 api 让其返回 promise 对象 从而支持异步函数的语法
const promisefy = require('util').promisify;
// 滴啊用 promisify 方法该着现有异步 api 让其返回 Promise 对象
const readFile = promisefy(fs.readFile);

async function run() {
    let r1 = await readFile('./1.txt', 'utf8');
    let r2 = await readFile('./2.txt', 'utf8');
    let r3 = await readFile('./3.txt', 'utf8');
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();