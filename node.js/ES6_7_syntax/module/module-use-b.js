'use strict';

var _moduleTools = require('./module-tools');

/**
 //一次性导入所有方法或属性，挂载到arr变量上

 import * as arr from './module-tools';

 arr.unique( [ 22, 3, 5, 3, 22, 4 ] );


 */

console.log((0, _moduleTools.unique)([22, 3, 5, 3, 22, 4]));

//babel写法
//$ babel example.es6 -o example.js -m amd