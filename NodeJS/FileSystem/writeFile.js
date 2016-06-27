
var fs  = require( 'fs' )

var filename = './2.txt'
/*

fs.writeFile( filename, 'Hello files', function(){

    console.log( arguments )

})

//写入，覆盖
fs.writeFile( filename, 'Hello files--2', function(){

    console.log( arguments )

})

fs.appendFile( filename, 'append some content', function(){

    console.log( arguments )

})
*/

//同步模式
if( fs.existsSync( filename ) ){
    var a = fs.appendFileSync( filename, '-Barrior' )
    console.log( a )
    console.log( '文本添加成功' )
}else{
    var b = fs.writeFileSync( filename, 'text' )
    console.log( b )
    console.log( '文件创建成功' )
}
console.log( '同步模式走完' )