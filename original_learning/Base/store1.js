console.time( 1 );
function storageSet( key, val, type ){
	val && type.setItem( key, JSON.stringify( val ) );
}

function storageGet( key, type ){
	return JSON.parse( type.getItem( key ) );
}

function storageRemove( key, type ){
	type[ key ? 'removeItem' : 'clear' ]( key );
}

function storageForEach( fn, type ){
	for( var i = 0, len = type.length, key; i < len; i++ ){
		key = type.key( i );
		fn.call( this, key, this.get( key ) );
	}
}

var store = {};
var session = {};

store.set = function( key, val ){
	storageSet( key, val, localStorage );
};

store.get = function( key ){
	return storageGet( key, localStorage );
};

store.remove = function( key ){
	storageRemove( key, localStorage );
};

store.forEach = function( fn ){
	storageForEach.call( this, fn, localStorage );
};

session.set = function( key, val ){
	storageSet( key, val, sessionStorage );
};

session.get = function( key ){
	return storageGet( key, sessionStorage );
};

session.remove = function( key ){
	storageRemove( key, sessionStorage );
};

session.forEach = function( fn ){
	storageForEach.call( this, fn, sessionStorage );
};
console.timeEnd( 1 );