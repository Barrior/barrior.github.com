/**
 * Created by weid on 2016/7/25.
 */

//把类数组转成数组，
//在es6里，字符串还被归为类数组
let arrayLike = 'Barrior';
console.log( Array.from( arrayLike ) );


//只要有遍历接口，都可以使用for...of，然而只有数组和字符串可以使用，json对象不具有遍历接口。
for( let val of [1, 2, 3] ){
    console.log( `--- ${ val } ---` );
}
for( let val of 'Barrior' ){
    console.log( val );
}

//遍历key
for( let val of [10, 20, 30].keys() ){
    console.log( `--- ${ val } ---` );
}

//数组推导
/*
let arr = [ 11, 22, 33 ];
console.log( [ for( i of arr ) i * 10 ] );
*/
