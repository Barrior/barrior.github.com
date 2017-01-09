
function log(){
    console.log( Array.prototype.join.apply( arguments ) )
}

var fs = require( 'fs' )

/**
 * open( path, flags, [mode], callback )
 *      path: 路径
 *      flags：打开文件的方式，读/写
 *      mode： 设置文件的模式，读/写/执行，4/2/1
 *      callback：回调函数
 *          err： 错误信息，成功err为null
 *          fd： 被打开文件的标识(文件句柄/文件编号)，类似定时器的id
 */
fs.open( './1.txt', 'r', function( err, fd ){

    if( err ){
        log( '文件打开失败' )
        log( err )
    }else{
        log( '文件打开成功' )
        log( 'err: ' + err )
        log( '文件id：' + fd )


        var bf = new Buffer( 10 )
        log( bf )
        /**
         *  fs.read(fd, buffer, offset, length, position, callback)
         *      buffer: buffer对象
         *      offset: 新的内容添加到buffer中的起始位置
         *      length：添加到buffer中内容的长度
         *      postion：读取的文件的起始位置，如果position为null，将会从文件当前的位置读取数据。
         *      callback： 回调
         *          回调函数给定了三个参数， (err, bytesRead, buffer)， 分别为错误，读取的字节和缓冲区。
         */
        fs.read( fd, bf, 0, 4, null, function( err, btr, bf ){

            log(err, btr, bf)

        })
    }

})
