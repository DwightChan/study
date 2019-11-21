// 1. 在普通函数定义的前面加上 async 关键字 普通函数成了异步函数
// 2. 异步函数默认的返回值是 promise 对象
// 3. 在异步函数内部使用 throw 关键字进行错误的抛出
// 
// await 关键字
// 1. 它只能出现在异步函数中
// 2. await promise 他可以是暂停异步函数的执行, 等待 promise 对象返回结果后在向下执行函数;


// async function fn() {
//     throw '发生一些错误';
//     return 123;
// }

// console.log(fn());
// fn().then(function(data) {
//     console.log(data);
// }).catch(function(err) {
//     console.log(err);
// });

async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}
async function run() {
    let r1 = await p1();
    let r2 = await p2();
    let r3 = await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();