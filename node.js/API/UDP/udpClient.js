/**
 * Created by Heart on 2016/2/22.
 */

var dgram = require('dgram');

var clientSocket = dgram.createSocket( 'udp4' );

/**
 * 绑定并设置回调接口
 */
clientSocket.bind(function () {
    clientSocket.setBroadcast( true )
});

//创建消息体
var message = new Buffer('Hello world');


clientSocket.send( message, 0, message.length, 8888, 'localhost', function ( err, bytes ) {
    clientSocket.close()
})