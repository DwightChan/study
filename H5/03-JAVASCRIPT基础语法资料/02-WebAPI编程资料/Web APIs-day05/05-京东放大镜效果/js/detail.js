window.addEventListener('load', function() {
    var preview_img = this.document.querySelector('.preview_img');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    var bigImg = this.document.querySelector('.bigImg');
    // 1. 当我们鼠标经过 preview_img  就显示和隐藏mask 遮挡层 和big 大盒子;
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 2. 鼠标经过的时候, 让黄色的盒子跟随移动
    preview_img.addEventListener('mousemove', function(e) {
        // [1] 计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // [2] 减去高度的300 的一般是150 就是我们mask 的最终的 left 和top 的值了
        // [3] 我们mask 的移动距离
        var maskX = x - mask.offsetWidth * 0.5;
        var maskY = y - mask.offsetHeight * 0.5;
        // [4] 如果 x 或 y 的坐标 小于0 那就让该值为0;
        // 遮挡层的最大移动距离
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX > maskMaxX) {
            maskX = maskMaxX;
        } else if (maskX < 0) {
            maskX = 0;
        }
        if (maskY > maskMaxY) {
            maskY = maskMaxY;
        } else if (maskY < 0) {
            maskY = 0;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图最大的移动距离
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        // 大图的移动距离 x y
        var bigX = maskX * bigMaxX / maskMaxX;
        var bigY = maskY * bigMaxY / maskMaxY;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
});