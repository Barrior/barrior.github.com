//将【服务】封装成个模块，供其他模块方便使用
var arrm = angular.module('arrModule',[]);
arrm.factory('myService', function(){
    return {
        unique: aData => {
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
        }
    }
});