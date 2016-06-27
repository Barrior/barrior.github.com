
var http = require( 'http' );
var url = require( 'url' );
var fs = require( 'fs' );
var qs = require( 'querystring' );

var server = http.createServer();

server.on( 'request', function( req, res ){

    var reqUrl = url.parse( req.url );

    switch ( reqUrl.pathname ){
        case '/':
            sendData( 'index.html', req, res );
            break;
        case '/user':
            sendData( 'user.html', req, res );
            break;
        case '/login':
            sendData( 'login.html', req, res );
            break;
        case '/login/check':
            console.log( req.method )
            //通过post提交的数据不能用reqUrl.query获取
            //console.log( qs.parse( reqUrl.query ) )

            if( req.method === 'POST' ){
                var con = [];
                req.on( 'data', function( chunk ){
                    con.push( chunk );
                });
                req.on( 'end',function(){
                    console.log( qs.parse( con.join() ) );
                });
            }
            break;
        default:
            sendData( 404, req, res );
    }

});


var modulePath = __dirname + '\\html\\';

function sendData( filename, req, res ){
    fs.readFile( modulePath + filename, function( err, data ){

        if( err ){
            res.writeHead( 404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end( '页面被吃掉了 ( T_T )' );
        }else{
            res.end( data );
        }

    });
}

server.listen( 8080, '127.0.0.1' );