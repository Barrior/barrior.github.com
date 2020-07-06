let getBeforeData = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > .5
                ? reject('Failed')
                : resolve(`Success`);
        }, 1000);
    });
};

let getData = function () {
    return getBeforeData()
        /*.then(res => {
            console.log('res: ', res);
            return res;
        })*/
        .catch(err => {
            console.log('err: ', err);
            return err;
        })
};

getData()
    .then(res => {
        console.log('done: ', res);
    });

setTimeout(() => {
    getData()
        .then(res => {
            console.log('done2: ', res);
        });
}, 2000);