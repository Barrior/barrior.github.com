/**
 * Created by Heart on 2016/2/15.
 */

var http = require( 'http' );
var url = require( 'url' );
var server = http.createServer();

//console.log( url.parse( 'http://www.baidu.com:8080/a/b.html?c=6#top' ) )

server.on( 'request', function( req, res ){

    //console.log( url.parse( req.url ) )
    res.writeHead( 200, {
        'content-type': 'text/html;charset=utf-8'
    });

    switch ( url.parse( req.url ).pathname ){
        case '/':
            res.end( '网站首页！' );
            break;
        case '/user':
            res.end( '用户中心' );
            break;
        default:
            res.writeHead( 404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end( '页面被吃掉啦 ( T_T ) ' );
    }

});

server.listen( 8080, 'localhost' );
