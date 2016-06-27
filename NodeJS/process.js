
//标准输入流默认是暂停 (pause) 的，所以必须要调用 process.stdin.resume() 来恢复 (resume) 接收。
process.stdin.resume();

process.stdout.write( '请输入值' );
//默认回车键触发此事件
process.stdin.on( 'data', function( msg ){

    process.stdout.write( '您输入了：' + msg )

})