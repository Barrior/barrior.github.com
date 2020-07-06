/*
 *作者:没有上半身
 *时间:2014-10-26
 *QQ：1144981399
 *网址:www.weidong.xyz
*/
jQuery.extend({
	drag:function(obj,p){
		obj.mousedown(function(ev){
			var disX=ev.pageX-p.offset().left,
				disY=ev.pageY-p.offset().top;
			
			if(p.setCapture)p.setCapture();
			$(document).mousemove(function(ev){
				var ev=ev||event,
					L=ev.clientX-disX,
					T=ev.clientY-disY,
					W=$(window).width()-p.outerWidth(),
					H=$(window).height()-p.outerHeight();
		
				if(L<0){L=0;}
				if(L>W){L=W;}
				
				if(T<0){T=0;}
				if(T>H){T=H;}
				
				p.css({left:L,top:T});
			});
			$(document).mouseup(function(){
				$(this).off();
				if(p.releaseCapture)p.releaseCapture();
			});
			return false;
		});
	},
	confirm:function(){
		$('#Wei-layer').remove();
		$('body').append('<div id="Wei-layer"><div class="confirm"><h3 class="title"></h3><div class="info"></div><div class="bottom"><p><a class="true" href="javascript:void(0);"></a><a href="javascript:void(0);"></a></p></div></div></div>');
		
		var oLayer=$('#Wei-layer'),
			oConfirm=oLayer.find('.confirm'),
			oTit=oLayer.find('.title'),
			oInfo=oConfirm.find('.info'),
			aA=oConfirm.find('.bottom a'),
			
			sTit='温馨提示',
			sInfo='',
			sSure='确定',
			sCan='取消',
			fFns=null,
			fFnc=null;
			
		switch(arguments.length){
			case 1:
				sInfo=arguments[0];
				break;
			case 2:
				sInfo=arguments[0];
				fFns=arguments[1];
				break;
			case 3:
				sInfo=arguments[0];
				fFns=arguments[1];
				fFnc=arguments[2];
				break;
			case 4:
				sInfo=arguments[0];
				sSure=arguments[1];
				fFns=arguments[2];
				fFnc=arguments[3];
				break;
			default:
				sTit=arguments[0];
				sInfo=arguments[1];
				sSure=arguments[2];
				sCan=arguments[3];
				fFns=arguments[4];
				fFnc=arguments[5];
		}
		
		oTit.html(sTit);
		oInfo.html(sInfo);
		aA.eq(0).html(sSure);
		aA.eq(1).html(sCan);
		
		var t=$(window).height()-oConfirm.outerHeight(),
			l=$(window).width()-oConfirm.outerWidth();
		
		oConfirm.css({top:t/2, left:l/2});
		oConfirm.addClass('confirm-animate');
		oLayer.fadeIn();
		
		$.drag(oTit,oConfirm);
		
		aA.on({
			'focus':function(){
				$(this).css({borderColor:'#0074BC'});
			},
			'blur':function(){
				$(this).css({borderColor:'#888'});
			}
		});
		
		aA.first().focus();
		
		aA.eq(0).click(function(){
			oConfirm.removeClass('confirm-animate');
			oLayer.fadeOut(function(){
				$(this).remove();
			});
			if(fFns)fFns();
		});
		
		aA.eq(1).click(function(){
			oConfirm.removeClass('confirm-animate');
			oLayer.fadeOut(function(){
				$(this).remove();
			});
			if(fFnc)fFnc();
		});
	}
});