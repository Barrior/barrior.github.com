/**
 * Created by Heart on 2016/3/2.
 */
'use strict';

//let 不允许重复声明
//let 具有块级作用域
//let 在window下声明，并不会像var一样挂载到window对象下
//let 不具备预解析过程，即在声明变量前输入变量，会报没定义错误

for( let i = 0; i < 10; i++ ){
    setTimeout(function(){
        console.log( `块级作用域：${i}` );
    }, 0 );
}


let num = 10;
num = {
    name: 'Barrior'
};
console.log( num );


//const定义常量，最好用大写表示常量咯
//定义常量必须存在值，且定以后不能再被修改
const MAX_NUM = 9999;
console.log( MAX_NUM );

//MAX_NUM = 99; //将会报类型错误
console.log( MAX_NUM );