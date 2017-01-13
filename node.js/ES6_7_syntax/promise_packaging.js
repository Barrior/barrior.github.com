
let getFirstData = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Failed');
            resolve(`I'm First Data`);
        }, 1000);
    });
};
let getData = function () {
    return getFirstData()
        /*.then(res => {
            console.log('second: ', res);
            return res;
        })*/
        .catch(err => {
            console.log('err: ', err)
            return err;
        })
};

getData()
    .then(res => {
        console.log('done: ', res);
    });