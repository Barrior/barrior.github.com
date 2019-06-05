const sleep = (time = 1000) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

const p1 = new Promise((resolve, reject) => {
  console.log('in p1')
  setTimeout(() => {
    console.log(`async: p1`)
    resolve('p1 resolve')
  }, 2000)
})

const p2 = new Promise((resolve, reject) => {
  console.log('in p2')
  setTimeout(() => {
    console.log(`async: p2`)
    resolve('p2 resolve')
  }, 1000)
})

const p3 = async function () {
  console.log('in p3')
  await sleep()
  console.log('async: p3')
  return 'async: p3'
}

// all 里面的 promise 对象任务并不会按队列逐个执行，而是同步执行
// 最后等待所有对象返回结果后，执行all后的 then 函数

// 并发处理
// 如果元素是 Promise 对象，则直接放入
// 如果元素是 async 函数，则需要执行放入
Promise
  .all([p1, p2, p3()])
  .then(res => {
    console.log('in Promise.all, res is: ', res)
  })
