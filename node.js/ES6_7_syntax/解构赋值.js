//解构赋值destruction
//按照一样的数据格式，进行赋值
let arr = [ 1, 2, 3 ];
let [a, b, c] = arr;
console.log( a, b, c );

//数组数据获取
let arrDeep = [ 1, 2, 3, [ 4, 5] ];
let [a2, b2, c2, [d, e]] = arrDeep;
console.log( d, e );

//对象数据获取
let obj = {
    name: 'Barrior',
    age: function () {
        return 23;
    },
    info: {
        sex: 'male'
    }
};
let { name, age, info } = obj;
console.log( name, age, info );

//数据交换
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log( x, y );


// 结构赋值内部机制
// 是先找到同名属性，然后再赋给对应的变量。
// 真正被赋值的是后者，而不是前者。
const person = {
    _name: 'Barrior',
    age: 24
};
const {_name: name} = person;
console.log(name);