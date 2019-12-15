// const artTemplate = require("art-template");

// 本地存储的 key
let dataKey = "employClass";
// 1. 先加载上一次数据
// 读取上一次数据

readLastData();
// 2. 接口请求
// 
$.ajax({
    // 请求地址
    url: '/home/employ-class',
    // 请求方式
    type: 'get',
    // 请求成功之后回调函数
    success: function(response) {

        // // 先渲染后保存
        dwRenderUI(response);
        // // 存取数据 在本地, 方便下次进入快速读取, (以字符串形式存储)
        localStorage.setItem(dataKey, JSON.stringify(response));
    },

    // 请求失败函数回调
    error: function(xhr) {
        console.log(xhr);
    }
});
// 读取上一次的数据
function readLastData() {
    // 将保存的数据 string 类型 转为 对象
    const response = JSON.parse(localStorage.getItem(dataKey));
    console.log(JSON.stringify(response));
    dwRenderUI(response);
};
// 渲染 UI 
function dwRenderUI(response) {
    console.log(response instanceof Array);
    // 注意 这个模板名称不要和 id 相同
    var html = template('employ-Class', { data: response });
    console.log(html);

    $('#employClass').html(html);
}