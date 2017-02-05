/**
 * 搭建一个http的服务器，用于处理用户发送的http请求
 */


//加载一个http模块
var http = require( 'http' );

//创建一个web服务器对象
var server = http.createServer();

//监听出错执行的事件
server.on( 'error', function( err ){
    console.log( err )
});

//开启监听成功执行的事件
server.on( 'listening', function(){
    console.log( 'listening...成功，正在监听' )
});

//客户端请求执行的事件，通常为浏览器打开对应的网址表示请求
server.on( 'request', function( req, res ){
    console.log( '有客户端请求了...' );

    //设置头信息，200表示成功，第二参数系统默认为OK，可更改（个性）
    res.writeHead( 200, 'Hello Sunny Day!', {
        //'content-type': 'text/plain'; //以文本解析
        'content-type': 'text/html;charset=utf-8'
    });

    res.write(
        '<h1><img src="http://img.7139.com/file/201206/16/118a73e8efafb1fc6029b5e7c4293f3b.gif">Hello Sunny Day!</h1>'
    );

    //当所有的响应报头和报文被发送完成时这个方法将信号发送给服务器；服务器会认为这个消息完成了。
    //每次响应完成之后必须调用该方法。
    res.end();
});


//监听客户端连接请求，只有当调用了listen方法后，服务器才开始工作
//server.listen(port, [hostname], [backlog], [callback])
//hostname: 主机名/IP/域名
server.listen( 8080, 'localhost' );


/**
 * 服务器自动分配的地址
 * console.log( server.address() );
 */
