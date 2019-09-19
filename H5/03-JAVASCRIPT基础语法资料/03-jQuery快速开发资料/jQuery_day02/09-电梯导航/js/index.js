$(function() {
    // alert('index.js');
    // 当我们点击了小li 此时不需要要执行页面滚动事件里面的li 的背景色选择 添加 current
    // 节流阀 互斥锁
    var flag = true;
    // 1. 显示隐藏电梯导航;
    var toolTop = $('.recommend').offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }

    $(window).scroll(function() {
        toggleTool();
        // 3 页面滚动到某个区域, 右侧电梯导航小li 相应添加和删除current 类名
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(1);
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            });
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应的内容区域
    $('.fixedtool li').click(function() {
        flag = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $('body, html').stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 点击之后当前的额小li 添加current 类名 , 其他兄弟移除current类名
        $(this).addClass('current').siblings().removeClass('current');
    })
});