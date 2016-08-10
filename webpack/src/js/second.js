/**
 * Created by weid on 2016/7/25.
 */
alert('second');
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

export default unique;