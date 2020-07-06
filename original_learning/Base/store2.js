console.time( 0 );

var store2 = {
		type: localStorage
	},
	session2 = {
		type: sessionStorage
	};

session2.set = store2.set = function( key, val ){
	val && this.type.setItem( key, JSON.stringify( val ) );
};


session2.get = store2.get = function( key ){
	return JSON.parse( this.type.getItem( key ) );
};


session2.remove = store2.remove = function( key ){
	this.type[ key ? 'removeItem' : 'clear' ]( key );
};


session2.forEach = store2.forEach = function( fn ){
	for( var i = 0, type = this.type, len = type.length, key; i < len; i++ ){
		key = type.key( i );
		fn.call( this, key, this.get( key ) );
	}
};

console.timeEnd( 0 );

/*
[ $.store = {}, $.session = {} ].forEach(function( v, i ){
	i = i ? sessionStorage : localStorage;
	
	v.set = function( key, val ){
		val && i.setItem( key, JSON.stringify( val ) );
	};
	
	v.get = function( key ){
		return JSON.parse( i.getItem( key ) );
	};
	
	v.remove = function( key ){
		i[ key ? 'removeItem' : 'clear' ]( key );
	};
	
	v.forEach = function( fn ){
		for( var j = 0, len = i.length, key; j < len; j++ ){
			key = i.key( j );
			fn.call( this, key, this.get( key ) );
		}
	};
});
*/
