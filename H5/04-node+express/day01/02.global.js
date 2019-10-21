/*global.console.log('我是global对象下面的console.log方法输出的内容');*/

global.console.log('我是global对象下面的console.log方法输出的内容');
global.setTimeout(function() {
    console.log('定时器执行一次');
}, 2000);


console.log('我是global对象下面的console.log方法输出的内容');

// setTimeout(() => {
//     console.log('123123');
// }, 2000);