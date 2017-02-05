let p1 = new Promise((resolve, reject) => {
    console.log('in p1');
    setTimeout(() => {
        console.log(`One second after the output 'p1'`);
        resolve('p1 resolve');
    }, 1000);
});
let p2 = new Promise((resolve, reject) => {
    console.log('in p2');
    setTimeout(() => {
        console.log(`Two seconds after the output 'p2'`);
        resolve('p2 resolve');
    }, 2000);
});

// all 里面的 promise 对象任务并不会按队列逐个执行，而是同步执行
// 最后等待所有对象返回结果后，执行all后的 then 函数
Promise
    .all([p1, p2])
    .then(res => {
        console.log('in Promise.all, res is: ', res);
    });
