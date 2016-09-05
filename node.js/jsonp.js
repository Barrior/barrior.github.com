var http = require( 'http' );
var url = require( 'url' );
var server = http.createServer();

server.on( 'request', function( req, res ){
    switch ( url.parse( req.url ).pathname ){
        case '/':
            res.writeHead( 200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(
                '<h3>网站首页！</h3>' +
                '<script src="/jsonp"></script>'
            );
            break;
        case '/jsonp':
            res.writeHead( 200, {
                //以js解析，这就是所谓的jsonp，生成js数据，传到前端，浏览器当做js代码执行
                //这样就可以实现跨域请求了,因为js文件是可以跨域的嘛
                'content-type': 'application/x-javascript; charset=utf-8'
            });
            res.end( 'var d = [1, 2, 3, 4, 5]; alert(d)' );
            break;
    }
});

server.listen( 9999, 'localhost' );
