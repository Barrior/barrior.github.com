/*;(function($){
	$.fn.extend({
		lazyload:function(Options){
			var gThis=$(this),
				win=$(window),
				
				throttle=function(fn,delay){	//函数节流，【执行函数，延迟时间】
					var timer,
						startTime=new Date();
					
					return function(){
						clearTimeout(timer);
						
						if(!delay && new Date()-startTime>100){	//没有延迟，并判断延迟滚动时间的必须的时间
							startTime=new Date();
							fn()
							
						}else if(delay){
							timer=setTimeout(function(){
								startTime=new Date();
								fn()
							}, delay)
						}
					}
				},
			
				settings=$.extend({
					effect: 'fadeIn',
					fadeTime: 600,
					delay: 400
				},Options);
			
			loading();	//开始便加载已经出现在可视区的图片
			win.on( 'scroll.lazyload', throttle(loading, settings.delay) );
			
			function loading(){
				if(!gThis.length) return win.off('scroll.lazyload');	//当所有的图片都加载完，移除窗口滚动事件
				
				gThis.each(function(){
					var _this=$(this),
						top=win.scrollTop(),
						imgTop=_this.offset().top,
						imgHeight=_this.outerHeight(true);
					
					if(top+win.height()>imgTop && imgTop+imgHeight>top){
						gThis=gThis.not( _this );	//删除jQuery选择好的元素集合中已经被加载的图片元素
						
						var dSrc=_this.attr('data-src');
						$(new Image()).prop('src',dSrc).load(function(){	//替换图片URL
							_this.attr('src',dSrc);
							_this.hide()[ settings.effect ]( settings.fadeTime );
							// settings.effect=='fadeIn' && _this.css('opacity',0).animate({opacity:1},settings.fadeTime)
						})
					}
				})
			}
			
			return $(this)
		}
	})
})(jQuery);
*/
;(function( $ ){
	/**
	 * 图片延迟加载
	 * @param  {Object} options 	可选
	 *        effect[string]: 		可选，目前只有fadeIn和none，默认fadeIn
	 *        fadeTime[number]: 	可选，fadeIn时动画完成执行的时间，默认600ms
	 *        delay[number]: 		可选，延迟滚动，默认400ms
	 * @return {object} 		jQuery元素对象
	 */
	$fn.lazyLoad = function( options ){
		var THIS = this,
			$WIN = $( window ),
			settings = $.extend({

				effect: 'fadeIn',
				fadeTime: 600,
				delay: 400

			}, options ),

			loading = function(){
				//当所有的图片都加载完，移除窗口滚动事件
				if( !THIS.length ){
					return $WIN.off( 'scroll.lazyLoad' );
				}

				THIS.each(function(){
					var _this = $( this ),
						top = $WIN.scrollTop(),
						imgTop = _this.offset().top,
						imgHeight = _this.outerHeight( true );
					
					if( top + $WIN.height() > imgTop && imgTop + imgHeight > top ){
						//删除jQuery选择好的元素集合中已经被加载的图片元素
						THIS = THIS.not( _this );
						
						var dSrc = _this.attr( 'data-src' );
						
						$( new Image() ).prop( 'src', dSrc ).load(function(){
							//replace image url
							_this.attr( 'src', dSrc ).removeAttr( 'data-src' );

							settings.effect == 'fadeIn' &&
								_this.css( 'opacity', 0 )
								.animate( { opacity: 1 }, settings.fadeTime );
						});
					}
				});
			};

		//开始便加载已经出现在可视区的图片
		loading();
		$WIN.on( 'scroll.lazyLoad', Base.throttle( loading, settings.delay ) );

		return this;
	};
	
})(jQuery);
