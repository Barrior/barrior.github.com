
let getData = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('before reject');
            reject(new Error('***** error *******'));
            console.log('after reject');
        }, 1000);
    });
};

;(async function start () {
  try {
    const { stderr, stdout } = await getData()
    console.log('getData completed.', stderr, stdout)
  } catch (err) {
    console.log('\n ++++ in catch: ++++ \n')
    console.log('err: %o \n', err)
    console.log('typeof err: %s', typeof err)
  }
}())