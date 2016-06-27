
var fs  = require( 'fs' )
var dirname = './新文件夹'

/*
fs.mkdir( dirname, function(){
    console.log( arguments )
})

fs.rmdir( dirname, function(){
    console.log( arguments )
})*/

fs.readdir( '../FileSystem', function( err, fileList ){
    if( err ){
        console.log( '读取文件夹错误' )
    }else{

        fileList.forEach(function( v ){
            //console.log( v )
            //查看当前文件夹里的文件的状态
            fs.stat( v, function( err, info ){
                if( err ){
                    console.log( '文件状态查看失败' )
                }else{
                    switch ( info.mode ){
                        //33206表示文件
                        case 33206:
                            console.log( '[文件]' + v )
                            break;
                        //16822表示文件夹
                        case 16822:
                            console.log( '[文件夹]' + v )
                            break;
                    }
                }
            })
        })
    }
})
