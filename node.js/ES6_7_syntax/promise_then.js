

function getData () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve('OK');
            //reject('FAIL');
        }, 1000);
    });
}

getData()
    .then((res) => {
        console.log('1: ', res);
    })
    .then((res) => {
        console.log('2: ', res);
    });