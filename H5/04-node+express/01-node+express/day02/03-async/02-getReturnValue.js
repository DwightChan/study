function getMsg(callback) {
    setTimeout(function name(params) {
        callback({
            msg: 'hello node.js'
        });
    }, 2000);
}
getMsg(function(data) {
    console.log(data);
});