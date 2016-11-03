/**
 * Created by weid on 2016/11/3.
 */

const person = {
    name: 'Barrior',
    age: 23
};

// 5656
function innerFn(a, b){
    console.log(a, b)
}

var condition = true;
if( condition ){
    var innerVar = 9;

    innerFn();
    function qqqqqqq(){

    }
    console.log(innerVar);
}

console.log('test')

;(function a( b, c ) {
    console.log( b, c );
}(...[1, 2, 3]))

console.log( person );