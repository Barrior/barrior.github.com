/**
 * Created by weid on 2016/7/25.
 */

let str = '吥';
console.log( str.codePointAt(0) );
console.log( String.fromCodePoint(21541) );


//复制字符串，复制10次，返回新的字符串
let repeatStr = str.repeat(10);
console.log( repeatStr );


//模板字符串，甚至里面可以是个表达式
console.log( `The repeatStr is : ${ repeatStr + '啊啊啊啊~' }` );
