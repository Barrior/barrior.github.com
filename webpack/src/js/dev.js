
//style
require('../sass/test.css');
require('../sass/index.less');
require('../sass/index.scss');

//js
import unique from './second.js';
//使用webpack配置好的别名，请求jQuery
import $ from 'jq';

const sum = (...vals) => {
    let sum = 0;
    vals.forEach( v => sum += v );
    return sum;
};

let num = [ 1, 2, 3, 4, 5 ];

$('body').html(
    `
    <h3>[ 2, 3, 3, 5, 8, 4, 8 ]去重后为：${ unique( [ 2, 3, 3, 5, 8, 4, 8 ] ) }</h3>
    <h3>${ num.join(' + ') } = ${ sum( ...num ) }</h3>
    <img src="./src/img/google.png">
    `
);

console.log( 10, 20 );
console.log( a );