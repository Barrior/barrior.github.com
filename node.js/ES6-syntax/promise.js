
let getDataOne = function () {
    return new Promise( resolve => {
        setTimeout(() => {
            console.log('p1 done');
            resolve('p1---msg');
        }, 1000);
    });
};
let getDataTwo = function () {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('p2 done');
            reject('p2---msg');
        }, 1000);
    });
};

getDataOne()
    .then(msg => {
        console.log('then 1: ', msg);

        // 如果这里不使用 return 返回函数本身返回的 promise 对象，
        // 那么下一个 then 将会比【这个异步】先执行
        return getDataTwo();
    })

    .then(msg => {
        console.log('then 2: ', msg);
        return 'Pass to the next';
    })

    // 如果 promise 对象返回了 reject，
    // 那么需要用 catch 捕获，否则会报错，不往下继续执行
    // 捕获则会执行捕获函数，然后继续向下执行
    .catch(err => {
        console.log('then 2 err msg: ', err);
        return 'Pass to the next';
    })

    .then(msg => {
        console.log('then 3: ', msg);
    });

/*
 getDataOne()
    .then((msg) => {
        console.log('then1: ', msg);
        getDataTwo();
    })
    .then((msg) => {
        console.log('then2: ', msg);
    });
*/