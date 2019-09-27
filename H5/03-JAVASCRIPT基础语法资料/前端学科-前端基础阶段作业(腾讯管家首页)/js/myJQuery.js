// 自定义封装 jQuery ,以免以后jQuery 升级或者其变动 那只要修改这个文件即可 外部使用这个文件的方法取代直接使用 jquery 文件的方法
// 前缀都使用 dw_ 开头
// 下滑显示
function dw_SlideDown(obj, timeInterval) {
    // 封装成 jQuery对象 调用jQuery的方法
    return $(obj).stop().slideDown(timeInterval);
};
// 上滑隐藏
function dw_SlideUp(obj, timeInterval) {
    // 封装成 jQuery对象 调用jQuery的方法
    return $(obj).stop().slideUp(timeInterval);
};
// 切换效果
function dw_SlideToggle(obj, timeInterval) {
    // 封装成 jQuery对象 调用jQuery的方法
    return $(obj).stop().slideToggle(timeInterval);
}
// 停止动画
function dw_stop(obj) {
    // 封装成 jQuery对象 调用jQuery的方法
    return $(obj).stop();
}