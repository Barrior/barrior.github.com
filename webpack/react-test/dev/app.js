
// 这里请求node_modules下面的react, react-dom模块
// 在webpack里配置的alias模块不可用，会出现路径错误的情况，这是怎么回事
import React from 'react';
import ReactDOM from 'react-dom';
import ShowImg from './components/showImg';
import './style/app.less';

const imgUrl = require('./img/photo.jpg');

console.log( window );
console.log( window.React );    //undefined
console.log( ReactDOM );

let container = document.createElement( 'div' );
document.body.appendChild( container );

ReactDOM.render(
    <ShowImg></ShowImg>,
    container
);