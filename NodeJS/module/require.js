/**
 * 模块查找机制
 *
 * 文件名 -> .js -> .json -> .node -> 报错
 */

//模块引用的绝对路径
var customModule = require( 'e:/NodeJS/module/scope' );
console.log( customModule )
console.log(
    'max number in [1,2,3,4] is: '+
    customModule.arr.max( [1,2,3,4] )
)

/**
 * 相对路径：【 ./ 】代表当前路径
 *
 * require( 'name' );   //加载node中的核心模块，或者是node_modules
 */
require( './a.txt' );
