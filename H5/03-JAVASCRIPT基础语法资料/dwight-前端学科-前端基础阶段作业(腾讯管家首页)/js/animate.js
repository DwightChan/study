// 移动动画
function animateLeft(obj, targetLeft, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.leftTimer);
    obj.leftTimer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((targetLeft - obj.offsetLeft) / 10);
        var step = (targetLeft - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == targetLeft) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.leftTimer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
};
// 宽度
function animateWidth(obj, targetWidth, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.widthTimer);
    obj.widthTimer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((targetLeft - obj.offsetWidth) / 10);
        var step = (targetWidth - obj.offsetWidth) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetWidth == targetWidth) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.widthTimer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.width = obj.offsetWidth + step + 'px';
    }, 15);
};