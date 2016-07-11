/**
 * Created by Heart on 2016/2/18.
 */

//阻塞模式，依次输出，常规写法
/*
console.log( '循环开始' )
var i = 10;
while ( i-- ){
    console.log( i )
}
console.log( '循环结束' )
*/


//非阻塞模式，类事件机制，先执行常规代码，再执行延时代码
console.log( '循环开始' )
setTimeout(function(){
    //此段代码最后执行
    var i = 10;
    while ( i-- ){
        console.log( i )
    }
}, 0 )
console.log( '循环结束' )
for(var i = 0; i < 10; i++){
    console.log( '非阻塞'+i )
}
