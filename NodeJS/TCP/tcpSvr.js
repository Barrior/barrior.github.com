/**
 * Created by Heart on 2016/2/15.
 */

//搭建TCP服务器，或称socket服务器，用于即时信息处理
var net = require( 'net' );

net.createServer(function ( connection ) {

    console.log( 'connecting...' )
    connection.write( 'Hello client' );
    /*connection.on('data', function (data) {
        connection.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World------'+data
        ].join('\n'));
    });*/

}).listen(8080);
