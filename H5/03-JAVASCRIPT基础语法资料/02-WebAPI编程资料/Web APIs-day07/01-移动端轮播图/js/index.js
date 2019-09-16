window.addEventListener('load', function() {
    // this.alert('123');
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    // 获得 focus 的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[0];
    // 2. 利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var traslatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + traslatex + 'px)';
    }, 2000);

    // 等着我们过度完成之后, 再去判断监听过度完成的时间 transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过度效果 这样让我们的 ul 快速调到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去掉滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px';
        }
        // 3. 小圆点跟随变化
        // 把 ol 里面的 li 带有 current 类名的选择出来去掉类名 remove
        var currentLi = ol.querySelector('.current');
        // console.log(currentLi);
        if (currentLi != null) {
            currentLi.classList.remove('current');
        }
        // ol.querySelector('.current').classList.remove('current');
        // 让当前的索引号 的小 li 加上 current add
        ol.children[index].classList.add('.current');
    });

    // 4. 手指滑动轮播图
    // 触摸元素 touchstart 获取手指初始坐标
    var startX = 0;
    // 后面我们会用这个移动距离 所以要定义一个全局变量
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器;
        clearInterval(timer);
    });
    // 移动手指 touchmove 计算手机滑动距离, 并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        //计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动华子 盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候, 不需要动画效果所以要取消过度效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // 如果用户手指移动过我们再去判断否则不做判断效果
        flag = true;
        // 阻止滚动屏幕的行为;
        e.preventDefault();
    });
    // 手指离开 根据移动距离去判断是否回弹还是播放上一张 或者下一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // (1) 如果移动距离大于 50 像素 我们就播放上一张或者下一张;
            if (Math.abs(moveX) > 50) {
                // 如果是右滑就是播放上一张 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就是 播放下一张 moveX 是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // (2) 如果移动距离小于 50 像素我们就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 手指离开的会后就重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + transitionx + 'px)';
        }, 2000);
    });
    // 返回顶部模块制作
    var goBack = this.document.querySelector('.goBack');
    var nav = this.document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    });
});