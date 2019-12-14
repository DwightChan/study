// 获取首页相关数据
$.ajax({

    type: "post",
    url: "/home/classic",
    success: function(response) {
        console.log(response);
    }
});