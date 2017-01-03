const sleep = function sleep(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('成功');
        }, time);
    });
};

const start = async function(){

    for( let i = 0; i < 10; i++ ){
        let res = await sleep(1000);

        // res: 成功
        console.log( res );
        console.log(`当前是第${i}次等待`);
    }

};

start();

// using：node --harmony-async-await async-await