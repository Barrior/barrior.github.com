
//loading js
//require('./second.js');
//loading css
require('../sass/test.css');
//loading sass
require('../sass/index.scss');

//es6模块
import unique from './second.js';

let sum = (...vals) => {
    let sum = 0;
    vals.forEach( v => sum += v );
    return sum;
};

alert( `sum's ${ sum( 1, 2, 3 ) }` );
