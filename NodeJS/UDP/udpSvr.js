/**
 * Created by Heart on 2016/2/22.
 */

/**
 * UDP: 用户数据电报协议（User Datagram Protocol）
 *
 */
//NodeJS中的UDP模块
var dgram = require('dgram');

var svrSocket = dgram.createSocket( 'udp4' );

/**
 * 监听错误
 */
svrSocket.on( 'error', function ( err ) {
    if( err ){
        console.log( err )
    }
})

/**
 * 监听由客户端发来的信息
 */
svrSocket.on( 'message', function ( msg, info ) {
    console.log( 'msg:', msg )
    console.log( 'info:', info )
})

/**
 * 监听‘监听’信息
 */
svrSocket.on( 'listening', function () {
    console.log( 'listening...' )
    //console.log( svrSocket )
})

svrSocket.bind( 8888 )