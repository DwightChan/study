window.addEventListener('load', function() {
    // nav lis 功能实现
    // 1.获取nav 的对应元素
    // 2.绑定对应事件
    // 3.鼠标在当前元素身上时响应事件
    // 4.鼠标离开时当前元素时响应事件
    // 5.鼠标点击当前元素时响应事件
    var navline = document.querySelector('#navline');
    var nav = document.querySelector('#nav');
    var navLis = nav.querySelectorAll('.top-nav-li');
    // 当前line 显示 对应li 的索引
    current = 0
        // forEach(callbackfn: (value: Element, key: number, parent: NodeListOf<Element>) => void, thisArg?: any): void
    navLis.forEach(function(element, index, array) {
        // console.log(element);
        // console.log(index);
        // console.log(array);
        var publishSort = element.querySelector('.publish-sort');
        // 1. 鼠标经过
        element.addEventListener('mouseenter', function() {
            //console.log(this.offsetWidth);
            animateLeft(navline, this.offsetLeft);
            animateWidth(navline, this.offsetWidth);
            dw_SlideToggle(publishSort, 300);
        });
        // 2. 鼠标离开就回到起始的位置 
        element.addEventListener('mouseleave', function() {
            dw_SlideToggle(publishSort, 300);
        });
    });

    // bannar 功能实现
    var publishCopy = document.querySelector('#publish-copy');

    var bannerLis = publishCopy.querySelectorAll('li');
    let bannerLisCount = bannerLis.length;
    let bannerWidth = publishCopy.offsetWidth;
    // 深拷贝
    var beforeLisHTML = publishCopy.innerHTML;
    var afterLisHTML = publishCopy.innerHTML;
    /*
               <li class="on">
                        <img src="./images/b1.jpg" class="" /> <p class="title">电脑管家纯净版</p> <p id="more-features" class="" style="margin-bottom: -15px;"> <br /> <span class="">全新视觉改版，探寻科技与未来的纯粹之美，净心守护您的电脑安全。 </span> <br /> <span class="">&nbsp;</span> </p> <p style="bottom: 46%;" class=""></p>
                    </li>
    */
    var datas = [{
        img: 'images/b1.jpg',
        title: '电脑管家纯净版1',
        subTitle: '全新视觉改版，探寻科技与未来的纯粹之美，净心守护您的电脑安全。',
    }, {
        img: 'images/b2.png',
        title: '电脑管家纯净版2',
        subTitle: '管家全新功能，有效拦截不良信息，支持绑定家长微信实时查看拦截情况。',
    }, {
        img: 'images/b3.png',
        title: '电脑管家纯净版3',
        subTitle: '腾讯电脑管家斩获AV-C2018年度性能、杀毒双料最高评级',
    }];
    var bannerNewLisHTML = [];
    for (var i = 0; i < datas.length; i++) {
        var index = i % 3;
        console.log('index' + index);

        var li = ' <li> <img src="' + datas[index].img + '" class="" /> <p class="title">' + datas[index].title + '</p> <p id="more-features" class="" style="margin-bottom: -15px;"> <br /> <span class="">全新视觉改版，探寻科技与未来的纯粹之美，净心守护您的电脑安全。 </span> <br /> <span class="">&nbsp;</span> </p> <p style="bottom: 46%;" class=""></p></li>';
        bannerNewLisHTML.push(li);
    }
    console.log(bannerNewLisHTML);

    publishCopy.innerHTML = bannerNewLisHTML;
    console.log(publishCopy.children);
    // 三倍数据 为以后轮播图做扩展
    var bannerIndex = 0;

    var circlesBack = document.querySelector('#b_dot');
    var circARR = [];
    for (let index = 0; index < bannerLisCount; index++) {
        var a = '<a href="javascript:void(0);" class=""></a>'
        circARR.push(a);
    }
    circlesBack.innerHTML = circARR;
    console.log(circlesBack.children);
    circlesBack.children[0].setAttribute('class', 'on');

    // 1. 下一张图=
    publishCopy.next = function() {
        this.children[bannerIndex].style = '';
        var cirleIndex = bannerIndex % bannerLisCount;
        circlesBack.children[cirleIndex].setAttribute("class", "");
        // for (var i = 0; i < circles.children.length; i++) {
        //     circles.children[i].setAttribute("class", "");
        // }
        bannerIndex = bannerIndex + 1;
        cirleIndex = bannerIndex % bannerLisCount;
        circlesBack.children[cirleIndex].setAttribute("class", "on");
        console.log(circlesBack.innerHTML);
        // 是否已经不是中间的
        if (bannerIndex % bannerLisCount == 0 &&
            (bannerIndex + 1) > bannerLisCount) {
            bannerIndex = 0;
        }

        this.children[bannerIndex].style = 'dispay:block;z-index:1';
    };
    publishCopy.addEventListener('moveenter', function() {
        // clearTimeout
        clearTimeout(publishCopy.bannerTimer);
        console.log('停止定时器');
    });
    publishCopy.addEventListener('moveover', function() {
        // 添加定时器
        publishCopy.bannerTimer();
        console.log('添加定时器');
    });
    // 2. 开启定时器
    publishCopy.bannerTimer = this.setInterval(function() {
        publishCopy.next();
    }, 2000);
});