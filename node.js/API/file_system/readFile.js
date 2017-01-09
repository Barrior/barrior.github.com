

var fs = require( 'fs' )
var filename = './2.txt'

fs.readFile( filename, function( err, bf ){

    if( err ){
        console.log( '出错啦' )
    }else{

        console.log( bf.toString() )

    }

})