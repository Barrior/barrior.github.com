
let getData = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('before reject');
            reject('error');
          console.log('after reject');
        }, 1000);
    });
};

getData()
    .then(msg => {
        console.log('then: ', msg);
    })
    .catch(err => {
        console.log('catch: ', err);
    })