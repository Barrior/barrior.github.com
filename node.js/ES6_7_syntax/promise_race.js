
const getData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success!!!');
    }, 3000)
});

const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('timeout');
    }, 2000);
});

function race() {
    return Promise.race([getData, timeout])
}

race()
    .then(res => {
        console.log('then: ', res);
    })
    .catch(err => {
        console.log('catch: ', err);
    });
