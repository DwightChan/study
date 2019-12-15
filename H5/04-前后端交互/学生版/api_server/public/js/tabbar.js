// console.log("123eqwe");
// // 点击了 tabbar 中第 i 个元素
// var tabbar = $('#tabbar');
// console.log(tabbar);
// var tabbarItems = $(tabbar ul > li);
// console.log(tabbarItems);
// // var tabbarOtherItems = $(tabbarItem).siblings
// for (var i = 0; i < tabbarItems.length; i++) {
//     $(tabbarItems[i]).click(function() {
//         $(this).addClass('selected');
//         $(this).removeClass('selected');
//     });
// }
// 1. 点击了 li 当前 li 添加 selected 类, 其余兄弟类移除该类
$(".tabbar li").click(function() {
    // 链式编程操作
    // 2. 点击和上次相同是 的到当前的 li 的索引
    var index = $(this).index();
    console.log(index + "当前索引号");
    // 3. 让其余兄弟移除该类
    // $(this).addClass('selected').siblings().removeClass('selected');
    // res.redirect('/?itemIndex=' + index);
    switch (index) {
        case 0:
            window.location.href = '/'; //'/index.html';
            break
        case 3:
            window.location.href = '/category.html';
            break
        default:
            window.location.href = '/'; //'/index.html';
            break
    }


})