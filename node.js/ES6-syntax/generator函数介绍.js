/**
 * Created by weid on 2016/8/10.
 */

/*
    使用函数后面接一个*申明一个generator函数，需配合yield使用才有功能，不然跟正常函数没啥区别

 */
function* showName(){

    //yield相当于return，不过每次调用返回一次值
    yield 'Barrior';
    yield 'Tina';

}

//第一次调用函数返回的是一个功能对象
//得通过调用该对象下的next()方法输出值
let fn = showName();
console.log( fn );
console.log( fn.next() );   //{ value: 'Barrior', done: false }
console.log( fn.next() );   //{ value: 'Tina', done: false }
console.log( fn.next() );   //{ value: undefined, done: true }
