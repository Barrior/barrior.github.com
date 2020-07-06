/*
* class类跟es5是一样的，只是换了个壳而已，内部属性或方法的挂载都是一样的，存在prototype上这样子。
* */
class Person {
    constructor( name, age ){
        this.name = name;
        this.age = age;
    }
    showName(){
        console.log( `${this.constructor.name} - showName: `, this.name );
    }
}
console.log( typeof Person );  //function
console.log( Person == Person.prototype.constructor );  //true
new Person( 'Barrior').showName();


//声明一个立即执行的类
let me = new class {
    constructor( name ){
        this.name = name;
    }
    showName(){
        console.log( this.name );

    }
}( 'Barrior' );


//继承
class Man extends Person {
    constructor( name, age ){
        // this.physical = 'strong'; 这样就会报错
        // 调用父类的constructor( name, age )，super必须放在最前，不然在其前面添加属性就会报错，如上
        super( name, age );
        this.sex = 'male';
    }
}
let jacke = new Man( 'jacke' );
jacke.showName();
//其实已经继承方法了，但是打印不出来
console.log(　jacke　);