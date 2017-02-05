
var fs = require('fs');

fs.readFile( './1.txt', function( err, fd ){

    if( !err ){

        console.log( '文件读取成功' )

    }

})