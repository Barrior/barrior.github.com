/**
 * 每个文就是一个模块，每个模块都有自己的作用域。
 * 使用var声明的变量，并不是全局的，而是当前模块的
 */
var a = 100;

//console.log( this );
//console.log( module );

/**
 * 在模块作用域，还有一个内置的模块对象，exports，它其实就是module.exports，为了方便使用而已，
 * 最终输出以module.exports为准，所以不要改变exports的对象引用
 */
//console.log( exports === module.exports );
exports.a = a;
exports.arr = {
    max: function( data ){
        return Math.max.apply( Math, data );
    },
    min: function( data ){
        return Math.min.apply( Math, data );
    }
};


/*
//导出函数对象，引用模块时方便直接调用，例 var hello = new require( './hello' );
//此种方法覆盖了exports的原来对象
function Hello( name ){
    this.name = name
    //...
}

exports = Hello;
*/
