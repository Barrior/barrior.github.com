/**
 * Created by weid on 2016/7/26.
 */

//函数的默认参数
//参数变量是默认声明的，所以不能用let或const再次声明。
//定义默认值的参数必须是尾参数，因为定义默认值后该参数可忽略
function person( name = 'Barrior', age = 23, info = { sex: 'male' } ){
    console.log( name );
    console.log( age );
    console.log( info );
}
person();
person( 'cico', 22, 'female' );


//与解构赋值一起使用
function test( {x, y = 5} ){
    console.log( x, y )
}
test( { x: 3 } );   //3, 5


//箭头函数
let add = val => val + 11;
console.log( add( 22 ) );   //33


//rest参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
//注意，rest参数之后不能再有其他参数
let sum = ( ...vals ) => {
    let sum = 0;

    console.log( vals );    //vals是一个数组

    vals.forEach( v => sum += v );
    /*
        相当于：
        vals.forEach( ( v ) => {
            sum += v;
        });
    */

    return sum;
}
console.log( sum(1, 2, 3) );
/*

 扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
    ①、...扩展运算符，将数组[ 1, 2, 3, 4, 5 ]转成( 1, 2, 3, 4, 5 )进行传参了
    ②、利用扩展运算符将字符串快速转成数组，扩展运算符需要【有遍历接口的】数据
 */
//①
let requireArr = [ 1, 2, 3, 4, 5 ];
console.log( '最大值是：' + Math.max( ...requireArr ) );

//②
let string = 'Barrior';
console.log( [ ...string ] );   //[ 'B', 'a', 'r', 'r', 'i', 'o', 'r' ]