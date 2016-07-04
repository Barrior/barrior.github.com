/**
 * Created by Heart on 2016/3/1.
 */

//WebSocket
var ws = (function(){
     var ws = new WebSocket( 'ws://127.0.0.1:8080' );
     return {
         open: function( fn ){
             ws.onopen = fn.bind( this );
             return this;
         },
         msg: function( fn ){
             var that = this;
             ws.onmessage = function( e ){
             fn.call( that, JSON.parse( e.data ) );
             };
             return that;
         },
         err: function( fn ){
             ws.onerror = fn.bind( this );
             return this;
         },
         close: function( fn ){
             ws.onclose = fn.bind( this );
             return this;
         },
         send: function( data ){
             ws.send( JSON.stringify( data ) );
             return this;
         }
     };
 }());


/* ws.open(function(){})
 console.log( ws )*/

 ws.send( 'string msg || josn msg' );
 ws.open(function(){

 })
 .msg(function(){

 })
 .err(function(){

 })
 .close(function(){

 });
