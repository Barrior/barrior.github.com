//load style
import '../sass/main.less';
//load js
import arrExtends from './arr-extends';
//使用webpack配置好的别名，请求jQuery
import $ from 'jq';

const sum = (...vals) => {
    let sum = 0;
    vals.forEach( v => sum += v );
    return sum;
};

let num = [ 1, 2, 3, 4, 5 ];
let arr = [ 2, 3, 3, 5, 8, 4, 8 ];


$('body').append(
    `
    <h3>${ '[ ' + arr.join(', ') + ' ]' }去重后为：${ arrExtends.unique( arr ) }</h3>
    <h3>${ num.join(' + ') } = ${ sum( ...num ) }</h3>
    <img src="./src/img/google.png">
    <h1> Hello webpack!000 </h1>
    `
);

console.log( 10, 20 );
//不存在的变量，报错
//console.log( a );