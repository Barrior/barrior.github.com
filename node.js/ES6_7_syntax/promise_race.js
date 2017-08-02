
const getData = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('success log');
        resolve('success!!!');
    }, 3000)
});

const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('timeout log');
        reject('timeout!!!');
    }, 2000);
});

Promise.race([getData, timeout])
    .then(res => {
        console.log('not in');
        console.log('then: ', res);
    })
    .catch(err => {
        console.log('be in');
        console.log('catch: ', err);
    });
