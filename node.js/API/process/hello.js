

console.log( __filename )
console.log( global.__filename )
console.log( this.__filename )

//返回进程的pid值，在任务管理器可以查看到
console.log( process.pid );

setInterval(function(){

    console.log( '保持进程，才能在任务管理器看到pid' )
    //返回node进程的内存情况，单位是byte
    console.log( '内存使用：' + process.memoryUsage() )

    //退去进程
    process.exit();
}, 5000 )

function log( data ){

    process.stdout.write( data )

}

log( '你好，输出流，内部log实现原理也是用输出流做的' );

