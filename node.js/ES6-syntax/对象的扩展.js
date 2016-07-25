/**
 * Created by weid on 2016/7/25.
 */

function fn( x, y ){
    x++;
    y++;

    //es6更简洁的语法
    return { x, y };
}
console.log( fn( 2, 4 ) );


//表达式变量
let person = {
    name: 'Barrior',
    [ 'sex' ]: 'male',
    [ 'a' + 'ge' ]: 23,
    [ 'showName' ]: () => {
        //注意，箭头函数的this，指向定义时所在的对象，而不是使用时所在的对象。
        //箭头函数的this是固定不变的。
        console.log(this);
        console.log( person.name );
    }
};

person.showName();
console.log( person );
