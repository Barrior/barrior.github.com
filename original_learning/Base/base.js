
var Base = (function(){
	
	var WIN = window,
		DOC = document,
		LOCATION = location;
	
	function Base(){
		this.hostname = LOCATION.hostname;
	}
	
	var $ = Base.prototype;
	
	//扩展数组处理方法
	var aFn = $.arr = {};
	
	//将多维数组转换为单维数组
	//少用concat会减少数组生成，速度快于全用concat
	aFn.toSingle = function( aData ){
		for( var i = 0, len = aData.length, arr = [], val; i < len; i++ ){
			val = aData[ i ];
			Array.isArray( val ) ? arr = arr.concat( arguments.callee( val ) ) : arr.push( val );
		}
		
		return arr;
	};
	
	//求和
	aFn.sum = function( aData, sign ){
		return eval( this.toSingle( aData ).join( sign || '+' ) );
	};
	
	//最大最小值
	/**
	 * [maxMin description]
	 * @param  {[Array]} aData     [description]
	 * @param  {[String]} condition [ aFn.max or aFn.min run condition ]
	 * @return {[Number]}           [description]
	 */
	aFn.maxMin = function( aData, condition ){
		var MATH = Math;
		aData = this.toSingle( aData );
		
		return condition ? MATH[ condition ].apply( MATH, aData ) :
			{
				max: MATH.max.apply( MATH, aData ),
				min: MATH.min.apply( MATH, aData )
			};
	};
	
	//最大值
	aFn.max = function(){
		return this.maxMin( arguments[0], 'max' );
	};
	
	//最小值
	aFn.min = function(){
		return this.maxMin( arguments[0], 'min' );
	};
	
	//数组去重
	//当重复元素越少时，这样的写法每次遍历时都会遍历查找值v是否存在arr里，耗时
	aFn.unique = function( aData ){
		var arr = [];
		
		aData.forEach(function( v ){
			if( arr.indexOf( v ) == -1 ){
				arr.push( v );
			}
		});
		
		return arr;
	};
	
	//兼容（compatible）IE6的写法
	/*aFn.unique = function( aData ){
		var arr = [];
		
		firstEach: for( var i = 0, len = aData.length; i < len; i++ ){
			/**
			 * 这里不采用封装一个indexOf方法，增加访问并不是一件好事。
			 * 这里不采用for( var j = 0, length = arr.length; j < length; j++ )，
			 * 因为这样写，每次最外层循环时都会计算arr的长度，相比而言，i已经是计算好的值，会更快。
			 *
			for( var j = 0; j < i; j++ ){
				if( aData[ i ] === arr[ j ] ){
					continue firstEach
				}
			}
			arr.push( aData[ i ] )
		}
		
		return arr;
	};*/
	
	//[ 1, 2, 3, '3', 3, [ 4, 5 ], [ 4, 5 ] ]
	//当重复元素越少时，这样的写法会生成越多的数组，耗内存
	aFn.uniqueHash = function( aData ){
		var arr = [],
			hash = {};
		
		aData.forEach(function( v ){
			if( !hash[ v ] ){
				arr.push( v );
				hash[ v ] = [ v ];
				
			}else if( hash[ v ].indexOf( v ) == -1 ){
				arr.push( v );
				hash[ v ].push( v );
			}
		});
		
		return arr;
	};
	
	//乱序 [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	//比较简单的，但不算是真正意义上的随机散乱，不够散乱
	aFn.disorderly = function( aData ){
		
		aData.sort(function(){
			return Math.random() - .5;
		});
		
		return aData;
	};
	
	//乱序 [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	aFn.disorderly = function( aData ){
		var arr = [],
			len = aData.length,
			j;
		
		/*
		for( var i = 0, len = aData.length, length = len; i < len; i++ ){
			var j = Math.floor( Math.random() * length-- );
			arr.push( aData[ j ] );
			aData.splice( j, 1 );
		}
		由for演变来
		*/
		
		while( len ){
			j = Math.floor( Math.random() * len-- );
			arr.push( aData.splice( j, 1 ) );
		}
		
		return arr;
	};
	
	//并集
	aFn.merge = function( aData, aDataSecond ){
		return this.unique( aData.concat( aDataSecond ) );
	};
	
	//交集
	aFn.intersection = function( aData, aDataSecond, differ  ){
		var arr = [];
		
		this.unique( aData ).forEach(function( v ){
			var exist = aDataSecond.indexOf( v ) == -1;
			
			if( differ && exist || !differ && !exist ){
				arr.push( v );
			}
		});
		
		return arr;
	};
	
	//差集，从第一个数组里去掉与第二个数组的重复部分
	aFn.differ = function( aData, aDataSecond ){
		return this.intersection( aData, aDataSecond, 1 );
	};
	
	
	/**
	 * localStorage & sessionStorage
	 */
	var store = $.store = {
			t: localStorage
		},
		session = $.session = {
			t: sessionStorage
		};
	
	session.set = store.set = function( key, val ){
		val && this.t.setItem( key, JSON.stringify( val ) );
	};
	
	session.get = store.get = function( key ){
		return JSON.parse( this.t.getItem( key ) );
	};
	
	session.remove = store.remove = function( key ){
		this.t[ key ? 'removeItem' : 'clear' ]( key );
	};
	
	session.forEach = store.forEach = function( fn ){
		for( var i = 0, type = this.t, len = type.length, key; i < len; i++ ){
			key = type.key( i );
			fn.call( this, key, this.get( key ) );
		}
	};
	
	
	/**
	 * compatible
	 */
	$.pInt = function( num, radix ){
		return parseInt( num, radix || 10 );
	};
	
	/**
	 * @param  {Function} fn
	 * @param  {Number}   delay [ this >= 0 ]
	 * @param  {Number}   must  [ this >= 0 ]
	 * @return {Function}       to run When trigger it's event
	 */
	$.throttle = function( fn, delay, must ){
		if( !delay && !must ){
			return fn;
		}

		var startTime = new Date(),
			timer;
		
		return function( e ){
			var context = this;
			
			if( delay ){
				clearTimeout( timer );
				timer = setTimeout(function(){

					fn.call( context, e );
					
				}, delay );

			}else if( new Date() - startTime > must ){

				startTime = new Date();
				fn.call( context, e );
			}
		};
	};
	
	return Object.freeze( new Base() );
})();


/**
 * jQuery extend
 */
;(function( $ ){
	/**
	 * Tool methods
	 */
	
	/**
	 * Object methods 
	 */
	$.fn.goto = function( position, speed ){
		var THIS = this,
			elem = $( THIS );
		
		if( !speed || speed <= 0 ){
			speed = .3;
		}
		
		clearInterval( THIS.timer );
		
		THIS.timer = setInterval(function(){
			
			var top = elem.scrollTop(),
				space = ( position - top ) * speed;
				
			top += top > position ? Math.floor( space ) : Math.ceil( space );
			
			if( top < position + 1 && top > position - 1 ){
				
				clearInterval( THIS.timer );
				top = position;
				
			}
			
			elem.scrollTop( top );
			
		}, 30 );
		
		return elem;
	};
	
	$.fn.toTop = function( speed ){
		return this.goto.call( this, 0, speed );
	};
	
	$.fn.toBottom = function( speed ){
		return this.goto.call( this, $(document).height() - $(window).height(), speed );
	};
	
	
	$.fn.clickToggle = function( fnFirst, fnSecond, delay, must ){
		var toggle;
		
		return $( this ).on( 'click', Base.throttle(function( e ){
			
			( toggle ? fnSecond : fnFirst ).call( this, e );
			toggle = !toggle;
			
		}, delay, must ) );
	};
	
	$.fn.mousewheel = function(){
		
	};
	
	$.fn.drag = function( options ){
		var $this = $( this ),
			$doc = $( document ),
			fnEmpty = function(){},
			fnDown = fnEmpty,
			fnMove = fnEmpty,
			fnUp = fnEmpty,
			range;
			
		if( options ){
			options.down && ( fnDown = options.down );
			options.move && ( fnMove = options.move );
			options.up && ( fnUp = options.up );
			
			range = options.limit ?
				function( val, min, max ){
					return val < min ? min : val > max ? max : val;
				} : 0;
		}
		
		return $this.on( 'mousedown.drag', function( e ){
			var THIS = this,
				offset = $this.offset(),
				disX = e.pageX - offset.left,
				disY = e.pageY - offset.top;
			
			fnDown.call( THIS );
			
			$doc.on( 'mousemove.drag', function( e ){
				var left = e.pageX - disX,
					top = e.pageY - disY;
				
				if( range ){
					left = range( left, 0, $( window ).width() - $this.outerWidth() );
					top = range( top, 0, $( window ).height() - $this.outerHeight() );
				}
				
				$this.css({
					left: left,
					top: top
				});
				
				fnMove.call( THIS );
			});
			
			$doc.on( 'mouseup.drag', function(){
				$doc.off( 'mousemove.drag mouseup.drag' );
				fnUp.call( THIS );
			});
			
			return false;
		});
	};
	
	$.fn.dragSort = function( options ){
		var $doc = $( document ),
			fnEmpty = function(){},
			fnDown = options.down || fnEmpty,
			fnMove = options.move || fnEmpty,
			fnUp = options.up || fnEmpty,
			
			cloneStyle = $.extend({
				
				'background-color': '#eee'
				
			}, options.cloneStyle ),
			
			floatStyle = $.extend({
				
				'opacity': .9,
				'position': 'absolute',
				'border': '1px solid #ccc',
				'box-shadow': '1px 1px 4px 0 #ccc',
				'transform': 'rotate(5deg)'
				
			}, options.floatStyle );
				
		return $(this).on( 'mousedown.dragSort', options.target, function( e ){
			var THIS = this,
				$this = $( THIS ),
				offset = $this.offset(),
				disX = e.pageX - offset.left,
				disY = e.pageY - offset.top,
			
				clone = $this.clone()
					.css( cloneStyle )
					//这里用的 height() 函数，当box-sizing: border-box;计算是错误的，下同(width)
					.css( 'height', $this.height() )
					.empty(),
					
				hasClone = 1;
			
			fnDown.call( THIS );
			
			$doc.on( 'mousemove.dragSort', function( e ){
				if( hasClone ){
					$this.before( clone )
						.css( 'width', $this.width() )
						.css( floatStyle )
						.appendTo( $this.parent() );
						
					hasClone = 0;
				}
				
				var left = e.pageX - disX,
					top = e.pageY - disY,
					
					prev = clone.prev(),
					next = clone.next();
				
				$this.css({
					left: left,
					top: top
				});
				
				if( prev.length && top < prev.offset().top + prev.outerHeight()/2 ){
						
					clone.after( prev );
					
				}else if( next.length && top > next.offset().top - next.outerHeight()/2 ){
					
					clone.before( next );
				}
				
				fnMove.call( THIS );
			});
			
			$doc.on( 'mouseup.dragSort', function(){
				
				$doc.off( 'mousemove.dragSort mouseup.dragSort' );
				
				//click的时候也会触发mouseup事件，加上判断阻止这种情况
				if( !hasClone ){
					clone.before( $this.removeAttr( 'style' ) ).remove();
				}
				
				fnUp.call( THIS );
			});
			
			return false;
		});
	};
	
	$.fn.autoComplete = function(){

	};
	
})( jQuery );










