



var fs = require( 'fs' )
var filename = './3.txt'
var newFilename = './3.new.txt'

fs.rename( filename, newFilename, function( err ){

    if( err ){
        console.log( '出错啦' )
    }else{
        console.log( '重命名成功' )
    }

})

fs.stat( newFilename, function( err, status ){
    if( !err ){
        console.log( status )
    }
})

