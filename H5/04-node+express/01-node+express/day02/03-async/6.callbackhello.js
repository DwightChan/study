const fs = require('fs');

fs.readFile('./1.txt', 'utf8', (error, result1) => {
    console.log(result1);
    fs.readFile('./2.txt', 'utf8', (error, result2) => {
        console.log(result2);
        fs.readFile('./3.txt', 'utf8', (error, result3) => {
            console.log(result3);
        });
    });
});