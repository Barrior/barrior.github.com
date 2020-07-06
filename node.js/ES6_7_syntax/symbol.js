/**
 * ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
 * 它是JavaScript语言的第七种数据类型，
 * 前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
 */
let str = Symbol();
console.log( typeof str );  //symbol

/**
 * symbol的用途
 * ES5的对象属性名都是字符串，这容易造成属性名的冲突。
 * 比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。
 * 如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是ES6引入Symbol的原因。
 */

let codeTransform = Symbol();
let Base = {
    [codeTransform]: ( code ) => {
        switch ( `${code}`.trim().charAt(0) ){
            case '6':
                return `sh${ code }`;
            default:
                return `sz${ code }`;
        }
    }
};
Base.codeTransform = code => code;
//内部是可以修改的
//Base[codeTransform] = code => code;

//调用symbol属性，Symbol值作为对象属性名时，不能用点运算符。
console.log( Base[codeTransform]( 600000 ) );
//以下调用的是字符串属性
console.log( Base['codeTransform']( 600000 ) );
console.log( Base.codeTransform( 600000 ) );

//通过tostring将symbol值转换成字符串
console.log( Base[codeTransform].toString() );


//如：框架封装的时候就派上用场了，唯一不重复值
/*
 只有在 isMoving 的作用域范围内才可以使用上述代码，这可以实现弱封装机制：
 在一个模块内创建一些 Symbol，只有在该模块内部的对象才能使用，而不用担心与其它模块的代码发生冲突。
 http://web.jobbole.com/82957/
 */
/*
(( $ )=>{

    $.fn.modal = () => {
        this.each(function(){
            let $this = $(this);
            let xuiModal = Symbol('xui.modal');
            //这样，外部的程序是永远都访问不到这个属性的啦，也无法修改~
            if( !this[ xuiModal ] ){
                this[ xuiModal ] = true;
                //other codes...
            }
        });
    }

})(jQuery);
*/