/**
 * Created by Heart on 2016/2/29.
 */

var fs = require('fs');

fs.readFile( './2.txt', function( err, data ){

    if( err ){
        console.log( 'err' )
    }else{
        var sData = data.toString();
        sData = sData.replace( /assets\/static\/build-config\.js/i, function( v ){
            return 'assets/static/config.js'
        })
        //console.log( sData )
        fs.writeFile( './2.txt', sData, function(){
            console.log( '文件写入完成' )
        })
    }

})
