window.addEventListener('load', function() {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;


    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;

    // 重新设置当前circle 
    function circleChange() {
        // 干掉所有人 把所有的小li 清楚 current 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下我自己 当前的小li 设置 current 类名
        ol.children[circle].className = 'current';
    }
    // 遍历创建 ol 中的li circle 
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = this.document.createElement('li');
        // 记录当前的小圆圈的 索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把小li 插入到ol 里面
        ol.appendChild(li);
        if (i == 0) {
            li.className = 'current';
        }
        // 4. 小圆圈的排他思想我么可以直接在生成的小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {

            // 5. 点击小圆圈, 移动图片当前移动的是ul
            // ul 的移动距离是小圆圈的索引号 乘以 图片的宽度 注意是负值;
            // 当我们的点击了某个小li 就拿到当前的小li 的索引
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就把这个小li 的索引号给num
            num = index;
            // 当我点击了某个小li 就把这个li 的索引号给 circle
            circle = index;
            // 设置当前circle 的样式
            circleChange();
            console.log(focusWidth);
            console.log(index);
            this.animate(ul, -index * focusWidth);
        })
    }
    // 定时器手动调用点击事件
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);


    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后一张图片, 此时我们的ul要快速的复原left 改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // console.log('current:' + num);
            // console.log('total:' + ul.children.length);
            // 8.点击了右侧的按钮, 小圆圈跟随一起变化, 可以在声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == ol.childre.length  说明走到了最后, 我们克隆的这张图片了我们就复原;
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后一张图片, 此时我们的ul要快速的复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // console.log('current:' + num);
            // console.log('total:' + ul.children.length);
            // 8.点击了右侧的按钮, 小圆圈跟随一起变化, 可以在声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle == ol.childre.length  说明走到了最后, 我们克隆的这张图片了我们就复原;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });
    // 2. 鼠标进过focus 就显示隐藏左右按钮
    focus.addEventListener("mouseenter", function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
            // 2秒调用一次
        }, 2000);
    });
})