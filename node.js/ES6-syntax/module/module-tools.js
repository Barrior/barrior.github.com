/**
 * Created by weid on 2016/7/27.
 */

/**
 * 将多维数组转化成单维数组
 * @param  {Array}	aData
 * @return {Array}
 */
let toSingle = aData => {
    let arr = [];
    let isArray = Array.isArray;
    if( isArray( aData ) ){
        aData.forEach( v => {
            isArray( v ) ?
                arr = arr.concat( toSingle( v ) ) :
                arr.push( v );
        });
    }
    return arr;
};

/**
 * 将数组去重，效率优化算法
 * @param  {Array}	aData
 * @return {Array}
 */
let unique = aData => {
    let arr = [];
    let hash = {};
    if( Array.isArray( aData ) ){
        aData.forEach( v => {
            if( !hash[ v ] ){
                hash[ v ] = [ v ];
                arr.push( v );
            }else if( hash[ v ].indexOf( v ) == -1 ){
                hash[ v ].push( v );
                arr.push( v );
            }
        });
    }
    return arr;
};

//export let unique = unique;

export { unique, toSingle };