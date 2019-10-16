const fs = require('fs');

let promise = new Promise((resolve, reject) => {
    fs.readFile('./100.txt', 'utf8', (error, result) => {
        if (error != null) {
            reject(error);

        } else {
            resolve(result);
        }
    });
});

promise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})