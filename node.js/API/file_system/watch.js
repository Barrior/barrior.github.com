


var fs = require( 'fs' )
var filename = './3.new.txt'

fs.watch( filename, function( ev, filename ){

    console.log( ev )
    //console.log( filename )

    if( filename ){
        console.log( filename + '被改变啦' )
    }else{

        console.log( '出错啦' )

    }

})