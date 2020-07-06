let getData = function () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('p1---msg');
        }, 1000);
    });
};

function errorTip(msg) {
    // throw new Error(msg);
    return Promise.reject(msg);
}

getData()
    .then(msg => {
        console.log('then 1: ', msg);
        // 如果 throw 一个错误，那么不需要返回，也会走 catch 函数
        // errorTip('错误！');
        return errorTip('错误！');
    })
    .then(res => {
        console.log(2, res)
    })
    .catch(err => {
        console.log('err: ', err)
    });