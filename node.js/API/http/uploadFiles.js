
//https://www.npmjs.com/package/formidable
var formidable = require('formidable');
var util = require('util');
var http = require('http');
var url = require('url');
var svr = http.createServer();

svr.on( 'request', function( req, res ){
    res.writeHead( 200,{
        'content-type': 'text/html;charset=utf-8'
    });
    if( url.parse( req.url ).pathname === '/upload' && req.method.toLowerCase() == 'post' ){
        uploadFiles( req, res );
    }else{
        res.end(
            '<form method="post" action="/upload">'+
                '<input type="file" name="upload-files">'+
                '<input type="submit" value="上传文件">'+
            '</form>'
        );
    }
})
.listen( 8080 );

function uploadFiles( req, res ){
    var form = new formidable.IncomingForm();
    //form.uploadDir = './uploads';

    form.parse(req, function(err, fields, files) {
        if( err ){
            res.end( 'error' )
        }else{
            res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
            res.write('文件上传成功，文件信息：<br>');
            res.end(
                //inspect同JSON.stringify()方法雷同
                util.inspect({
                    fields: fields,
                    files: files
                })
            );
        }
    });
}
