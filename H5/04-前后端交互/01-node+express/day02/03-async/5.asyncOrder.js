// 定时器 里面的代码都都是属于 闭包 函数, 都属于异步执行函数

console.log("代码开始执行");

setTimeout(function() {
    console.log('2s 之后执行');
}, 2000);

setTimeout(function() {
    console.log('0s');
}, 0);

console.log('代码执行结束');