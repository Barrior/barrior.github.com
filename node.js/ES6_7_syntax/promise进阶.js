let p1 = new Promise(function( resolve, reject ){
    setTimeout(() => {
        console.log( 'p1' );
        resolve();
    }, 400 );
});
let p2 = new Promise(function( resolve, reject ){
    setTimeout(() => {
        console.log( 'p2' );
        reject();
    }, 200 );
});
let p3 = new Promise(function( resolve, reject ){
    setTimeout(() => {
        console.log( 'p3' );
        resolve();
    }, 600 );
});

let p4 = Promise.all( [ p1, p2, p3 ] );
p4.then(function(){

    console.log( '【成功】前三个已经执行完啦，且都是执行成功状态，才调用我！' )

}, function () {

    console.log( '前三个只要有一个失败了，我就被紧跟在后面被调用了咯' )

});

//只要p1、p2、p3之中有一个实例率先改变状态，p5的状态就跟着改变。
// 那个率先改变的Promise实例的返回值，就传递给p的回调函数。
//http://es6.ruanyifeng.com/#docs/promise#Promise-race
let p5 = Promise.race( [ p1, p2, p3 ] );