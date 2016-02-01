/**
 * particleground v1.0.0.开发者版本
 * https://github.com/Barrior/particleground
 * Copyright 2016 Barrior <Barrior@qq.com>
 * 采用 知识共享署名 3.0 中国大陆许可协议 进行许可。
 * 可自由转载、引用，但需保留作者及插件信息。
 * http://creativecommons.org/licenses/by/3.0/cn/
 */
/**
 * 为什么很多人都不缓存this，这样不利于压缩，每次都要去查找this对象，也不利于代码执行效率
 * 但是为什么很多人都不缓存this呢，不明白，希望高手指教，鄙人愚笨，不敢妄自缓存，故先全部都未做局部变量缓存，希望能得到高手教导。感谢您的伟大的不吝赐教！
 */
//异步
/*;(function( win, doc, math, factor ){

	if( typeof win.define === 'function' && define.amd ){
		
		define( [], factor.bind( win, win, doc, math ) );
		define( [], function(){
			
			return factor( win, doc, math );

		});

	}else{

		win.Particleground = factor( win, doc, math );

	}

}( window, document, Math, function(){

}));*/
;(function( win, doc, math ){
	'use strict';
	win.requestAnimationFrame = (function( win ) {
		return	win.requestAnimationFrame ||
				win.webkitRequestAnimationFrame ||
				win.mozRequestAnimationFrame ||
				function( fn ) {

		        	win.setTimeout( fn, 1000 / 60 );

		        };
	})( win );

	var random = math.random,
		floor = math.floor,
		abs = math.abs,
		sin = math.sin,
		PI = math.PI,
		radian = PI / 180,
		full = 2 * PI,

		pInt = function( s ){

			return parseInt( s, 10 );

		},
		randomColor = function(){
			//来源http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
			return "#" + random().toString( 16 ).slice( -6 );
		},
		limitRandom = function( max, min ){

			return random() * (max - min) + min;

		},
		extend = function( a, b ){

			for( var i in b ){

				a[ i ] = b[ i ];

			}

			return a;
		},
		getCss = function( elem, attr ){

			return pInt( getComputedStyle( elem, null )[ attr ] );

		},
		on = function( elem, evtName, handler ){

			elem.addEventListener( evtName, handler );

		},
		off = function( elem, evtName, handler ){

			elem.removeEventListener( evtName, handler );

		},

		Particleground = {
			particle: function( selector, options ){
					
				var set = this.set = extend({

					//全局透明度
					opacity: .8,
					//粒子颜色数组，默认随机色
					color: [],
					speed: 1,
					//粒子个数，默认为容器的0.1倍
					//传入[0, 1)显示容器相应倍数的值，或传入具体个数[1, +∞)
					num: .1,
					//粒子最大半径
					max: 2.4,
					//粒子最小半径
					min: .6,
					//连接线段最大距离
					dis: 180,
					//连接线段的宽度
					lineWidth: .2,
					//范围越大，连接的点越多
					r: 240,
					//移动事件的元素,false为canvas
					eventElem: false

				}, options );

				var container = this.container = doc.querySelector( selector ),
					c = this.c = doc.createElement( 'canvas' );

				this.cw = c.width = getCss( container, 'width' );
				this.ch = c.height = getCss( container, 'height' );
				container.appendChild( c );

				if( typeof set.eventElem != 'object' ){

					set.eventElem = this.c;

				}

				this.cxt = c.getContext( '2d' );
				//移动点的X坐标
				this.posX = random() * this.cw;
				//移动点的Y坐标
				this.posY = random() * this.ch;
				this.paused = false;

				this.createDot();
				this.draw();
				this.event();

			},
			wave: function( selector, options ){

				var set = this.set = extend({

					//全局透明度
					opacity: .8,
					//粒子颜色
					color: '#fff',
					//线条个数
					num: 1,
					//线条最大宽度(粒子最大半径)
					max: 1.4,
					//线条最小宽度
					min: .2,
					//波峰，取值[0-1]
					crest: .8,
					//线条运动速度
					speed: 1.4,

				}, options );

				var container = this.container = doc.querySelector( selector ),
					c = this.c = doc.createElement( 'canvas' );

				this.cw = c.width = getCss( container, 'width' );
				this.ch = c.height = getCss( container, 'height' );
				container.appendChild( c );

				this.cxt = c.getContext( '2d' );
				this.paused = false;

				this.createDot();
				this.draw();
			},
			snow: function( selector, options ){

				var set = this.set = extend({

					//雪花颜色
					color: '#fff',
					//雪花最大半径
					max: 6.5,
					//雪花最小半径
					min: .4,
					//运动速度
					speed: .4,

				}, options );

				var container = this.container = doc.querySelector( selector ),
					c = this.c = doc.createElement( 'canvas' );

				this.cw = c.width = getCss( container, 'width' );
				this.ch = c.height = getCss( container, 'height' );
				container.appendChild( c );

				this.cxt = c.getContext( '2d' );
				this.paused = false;
				this.dot = [];

				this.createDot();
				this.draw();
			}
		};

	Particleground.particle.prototype = {

		constructor: Particleground.particle,

		createDot: function(){
			
			var cw = this.cw,
				ch = this.ch,
				set = this.set,
				speed = set.speed,
				num = cw * set.num,
				color = randomColor,
				colorLength = set.color.length,
				dot = [],
				i = 0;

			if( set.num >= 1 ){
				num = set.num;
			}

			if( colorLength ){

				color = function(){
					return set.color[ floor( random() * colorLength ) ];
				};

			}

			for( ; i < num; i++ ){

				var r = limitRandom( set.max, set.min );

				dot.push({
					x: limitRandom( cw - r, r ),
					y: limitRandom( ch - r, r ),
					r: r,
					vx: limitRandom( speed, -speed * .5 ) || speed,
					vy: limitRandom( speed, -speed * .5 ) || speed,
					color: color()
				});

			}

			this.dot = dot;

		},
		draw: function(){
			var set = this.set,
				cw = this.cw,
				ch = this.ch,
				cxt = this.cxt;

			cxt.clearRect( 0, 0, cw, ch );

			//当canvas宽高改变的时候，全局属性需要重新设置
			cxt.lineWidth = set.lineWidth;
			cxt.globalAlpha = set.opacity;

			this.dot.forEach(function( v ){

				var r = v.r;

				cxt.save();
				cxt.beginPath();
				cxt.arc( v.x, v.y, r, 0, full );
				cxt.fillStyle = v.color;
				cxt.fill();
				cxt.restore();

				v.x += v.vx;
				v.y += v.vy;

				var	x = v.x,
					y = v.y;

				if( x + r >= cw || x - r <= 0 ){

					v.vx *= -1;
				
				}

				if( y + r >= ch || y - r <= 0 ){

					v.vy *= -1;

				}
			});

			this.connectDot();

			!this.paused && requestAnimationFrame( this.draw.bind( this ) );

		},
		connectDot:function(){

			var cxt = this.cxt,
				set = this.set,
				dis = set.dis,
				posX = this.posX,
				posY = this.posY,
				posR = set.r,
				scopeDot = [];

			this.dot.forEach(function( v ){

				if( abs( v.x - posX ) <= posR &&
					abs( v.y - posY ) <= posR ){

					scopeDot.push( v );

				}

			});

			scopeDot.forEach(function( v ){

				scopeDot.forEach(function( sib ){

					var x = v.x,
						y = v.y,
						sibX = sib.x,
						sibY = sib.y;

					if( abs( x - sibX ) <= dis &&
						abs( y - sibY ) <= dis ){

						cxt.save();
						cxt.beginPath();
						cxt.moveTo( x, y );
						cxt.lineTo( sibX, sibY );
						cxt.strokeStyle = v.color;
						cxt.stroke();
						cxt.restore();

					}

				});

			});

		},
		event: function(){

			this.handler = function( e ){

				this.posX = e.clientX;
				this.posY = e.clientY;

			}.bind( this );

			on( this.c, 'mousemove', this.handler );

			//让画布宽高自适应窗口大小的改变，为减少文件大小，在配置中省略
			if( this.set.adapt ){

				on( win, 'resize', function(){

					var oldCW = this.cw,
						oldCH = this.ch;

					this.cw = this.c.width = getCss( this.container, 'width' );
					this.ch = this.c.height = getCss( this.container, 'height' );

					var scaleX = this.cw / oldCW,
						scaleY = this.ch / oldCH;

					this.posX *= scaleX;
					this.posY *= scaleY;

					this.dot.forEach(function( v ){

						v.x *= scaleX;
						v.y *= scaleY;

					});

					this.paused && this.draw();

				}.bind( this ));

			}

		},
		pause: function(){

			if( !this.paused ){

				this.paused = true;
				off( this.set.eventElem, 'mousemove', this.handler );

			}

		},
		open: function(){

			if( this.paused ){

				on( this.set.eventElem, 'mousemove', this.handler );
				this.paused = false;
				this.draw();

			}

		}

	};


	Particleground.wave.prototype = {

		constructor: Particleground.wave,

		createDot: function(){
			
			var set = this.set,
				ch = this.ch,
				// crest = this.ch / 2 * set.crest,
				// num = set.num,
				num = 1,
				dotNum = this.cw / 2,
				dot = [],

				calc = ( set.max - set.min ) / dotNum;

			for( var i = 0; i < num; i++ ){

				// var scale = 1 - i / set.num;
				var	arr = [];

				for( var j = 0; j < dotNum; j++ ){

					arr.push({
						x: j * 2,
						// y: j / dotNum * crest * scale,
						y: ch / ( 30 - 27.6 * j / dotNum ),
						angle: j,
						r: j * calc  + set.min
					});

				}

				dot.push( arr );

			}

			this.dot = dot;

		},
		draw: function(){
			
			var set = this.set,
				cxt = this.cxt,
				cw = this.cw,
				ch = this.ch,
				halfCH = ch / 2,
				speed = set.speed;

			cxt.clearRect( 0, 0, cw, ch );
			cxt.globalAlpha = set.opacity;
			cxt.fillStyle = set.color;

			this.dot.forEach(function( arr ){
				
				arr.forEach(function( v ){

					cxt.save();
					cxt.beginPath();
					cxt.arc(
						v.x,

						//y = A sin（ ωx + φ ）+ h
						v.y * sin( v.angle * radian ) + halfCH,

						v.r, 0, full
					);
					cxt.fill();
					cxt.restore();

					v.angle -= speed;

				});

			});

			!this.paused && requestAnimationFrame( this.draw.bind( this ) );

		},
		pause: function(){

			if( !this.paused ){

				this.paused = true;

			}

		},
		open: function(){

			if( this.paused ){

				this.paused = false;
				this.draw();

			}
			
		}

	};

	Particleground.snow.prototype = {

		constructor: Particleground.snow,

		snowShape: function(){

			var set = this.set,
				r = limitRandom( set.max, set.min );

			return {
				x: random() * this.cw,
				y: -r,
				r: r,
				vx: random() || .4,
				vy: r * set.speed
			};

		},
		createDot: function(){
			//随机创建0-6个雪花
			var count = random() * 6;

			for( var i = 0; i < count; i++ ){

				this.dot.push( this.snowShape() );

			}
		},
		draw: function(){
			
			var THIS = this,
				set = THIS.set,
				cxt = THIS.cxt,
				cw = THIS.cw,
				ch = THIS.ch,
				dot = THIS.dot;

			cxt.clearRect( 0, 0, cw, ch );
			cxt.fillStyle = set.color;

			dot.forEach(function( v, i ){
				
				cxt.save();
				cxt.beginPath();
				cxt.arc( v.x, v.y, v.r, 0, full );
				cxt.fill();
				cxt.restore();

				v.x += v.vx;
				v.y += v.vy;

				//雪花反方向
				if( random() > .99 && random() > .5 ){

					v.vx *= -1;

				}

				//雪花从侧边出去，删除
				if( v.x < 0 || v.x - v.r > cw ){

					dot.splice( i, 1 );
					dot.push( THIS.snowShape() );

				//雪花从底部出去
				}else if( v.y - v.r >= ch ){

					dot.splice( i, 1 );

				}

			});

			//添加雪花
			if( random() > .9 ){

				THIS.createDot();

			}
			
			!THIS.paused && requestAnimationFrame( THIS.draw.bind( THIS ) );
		},
		pause: function(){

			if( !this.paused ){

				this.paused = true;

			}

		},
		open: function(){

			if( this.paused ){

				this.paused = false;
				this.draw();

			}
			
		}

	};


	win.Particleground = Particleground;

})( window, document, Math );



