function fn( x, y ){
    x++;
    y++;

    //es6更简洁的语法
    return { x, y };
}
console.log( fn( 2, 4 ) );


//属性，方法的简洁模式 & 表达式变量
let name = 'Barrior';
let person = {
    name,
    [ 'sex' ]: 'male',
    [ 'a' + 'ge' ]: 23,
    [ 'showName' ]() {
        console.log( 'this: ', this );
        console.log( person.name );
    }
};

person.showName();
console.log( person );

//监控对象的变化，调用回调函数
/*
 Object.observe( target, callback, eventType )
    target: 目标对象
    callback：回调函数，接受一个数组参数
    eventType：
        add：添加属性
        update：属性值的变化
        delete：删除属性
        setPropotype：设置原型
        reconfigure：属性的attribute对象发生变化

 Object.unobserve( target, callback, eventType )
 取消监听
*/
/*let mySelf = {
    name: 'Barrior',
    age: 23,
};
Object.observe( mySelf, function(){

});*/
