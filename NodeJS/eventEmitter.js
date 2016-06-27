/**
 * Created by Heart on 2016/2/18.
 */

console.time('run time');
//事件发射器，emitter：发射器
var EventEmitter = require('events').EventEmitter;
var a = new EventEmitter();

a.on( 'myEvent', function(){
    console.log( 'custom events...' )
});

//这 不是 setTimeout(fn, 0) 函数的一个简单别名，因为它的效率高多了。
process.nextTick(function() {
    //emit:发射，发出
    a.emit( 'myEvent' );
});

console.log('=======华丽的分割线======')
console.timeEnd('run time');