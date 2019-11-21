const fs = require('fs');

fs.writeFile('./demo.txt', '即将写入内容', err => {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log('文件写入成功');
});