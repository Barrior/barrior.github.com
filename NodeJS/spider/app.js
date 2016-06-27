
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


http.createServer(function ( req, res, err ) {
    if(err){
        res.end('error')
    }else{
        request('http://www.2cto.com/meinv/meitui/', function ( err, response, body ) {
            if( !err && response.statusCode === 200 ){
                var $ = cheerio.load(body);
                var arr = [];
                $('img').each(function () {
                    /*request($(this).attr('data-original'))
                        .pipe(fs.writeFileSync($(this).attr('data-original')))*/
                    arr.push(
                        '<img src="'+$(this).attr('data-original')+'" style="display: block">'
                    )
                });
                res.writeHead({
                    'content-type': 'text/html;charset=utf-8'
                });
                res.end( '<h1>show：</h1>'+arr.join('') );
            }
        });
    }
}).listen( process.env.PORT || 3000 );