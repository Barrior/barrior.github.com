/**
 * Created by weid on 2016/8/12.
 */
//加载模块，对象的简写方式申明输出变量：
//上面代码的import命令，就用于加载profile.js文件，并从中输入变量。
// import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。
// 大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同
import {firstName, lastName, year} from './profile';

//如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import { lastName as surname } from './profile';

//下面的代码仅仅执行载入profile模块，但不输出任何值。
import './profile';


//模块的整体加载 §
//将输出的变量全部挂载到circle对象上，后面通过访问对象的属性/方法，执行操作
import * as circle from './circle';

console.log( '圆面积：' + circle.area( 4 ) );
console.log( '圆周长：' + circle.circumference( 14 ) );

/*
 要对输出模块的变量【指定任意名字】，而不是限制于输出模块的变量，
 需要输出模块加上default属性，如，'./export-default'文件内容:
     function innerName(){
        console.log('内部模块')
     }
     export default innerName

 export default命令用于指定模块的默认输出。
 显然，一个模块只能有一个默认输出，因此export deault命令只能使用一次。
 所以，import命令后面才不用加大括号，因为只可能对应一个方法。
 */

import customName from './export-default';
import $ from 'jquery';