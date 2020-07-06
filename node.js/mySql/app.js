/**
 * Created by Heart on 2016/2/19.
 */

var http = require('http');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb'
});

http.createServer(function( req, res ){
    //客户端请求之后，返回数据库中的所有内容
    connection.query('select * from students', function(err, rows, fields) {
        if (err){
            res.end( 'error\n' + JSON.stringify( err ) );
        }else{
            res.writeHead( 200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end(
                JSON.stringify({
                    //表的每一行
                    rows: rows,
                    fields: fields
                })
            )
        }
    });
    //connection.end();
}).listen( 8080 );


