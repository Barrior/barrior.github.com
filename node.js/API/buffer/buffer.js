

var str1 = 'Hello'
var bf1 = new Buffer( str1, 'utf-8' );  //默认utf-8
console.log( str1.length );
console.log( bf1.length )

var str2 = '你好'
var bf2 = new Buffer( str2 );
console.log( str2.length );
console.log( bf2.length );
console.log( bf2 );
console.log( bf2.toString() );
//一个中文占3个字节