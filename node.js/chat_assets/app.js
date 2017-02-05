/**
 * Created by Heart on 2016/2/17.
 */

var express = require('express');
var fs = require('fs');
var app = express();

app.get( '/', function ( req, res ) {
    console.log( '有客户端请求了...' );

    //res.send( '<h1><img src="http://img.7139.com/file/201206/16/118a73e8efafb1fc6029b5e7c4293f3b.gif">Hello Sunny Day!</h1>' )

    fs.readFile( './views/index.jade', function ( err, data ) {
        if( err ){

            res.end( '404' );

        }else{

            res.end( data );
        }
    })
});

app.listen( 8080, 'localhost' );