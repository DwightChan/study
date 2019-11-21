function getData(callback) {
    callback('123');
}

getData(function(n) {
    console.log('callback 函数被调用了');
    console.log(n);

});