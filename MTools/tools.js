/*;(function($){
	$.extend($.fn,{
		//让页面滚动到指定高度，$.toWhere(500[,0.3])
		toWhere:function(t,s){
			var w=$(window),
				s=s || 0.3;
			clearInterval(window.weiT);
			window.weiT=setInterval(function(){
				var is=w.scrollTop(),
					ic=(t-is)*s;
				is+=(is>t?Math.floor(ic):Math.ceil(ic));
				w.scrollTop(is);
				if(is<t+1 && is>t-1)clearInterval(window.weiT),w.scrollTop(t);
			},30);
		},
		
		//返回页面顶部，$.toTop([0.3])
		toTop:function(s){
			$().toWhere(0,s);
		},
		
		//去到页面底部，$.toBottom([0.3])
		toBottom:function(s){
			$().toWhere($(document).height()-$(window).height(),s);
		},
		
		//模拟alert
		alert:function(o){
			$().confirm(o,'1');
		},
		
		//模拟confirm
		confirm:function(o,s){
			$('#wei-layer').remove();
			sCan=s?'':'<a href="javascript:;">'+(o.cancel||'取消')+'</a>';
			$('body').append('<section id="wei-layer"><div class="wrap wrap-animate"><h3 class="title"></h3><div class="content"></div><p class="button"><a href="javascript:;"></a>'+sCan+'</p></div></section>').css('overflow','hidden');
			
			var sT=o.title||'温馨提示',
				sC=o.content,
				sO=o.ok||'确定',
				fO=o.fOk||null,
				fC=o.fCancel||null,
				
				oL=$('#wei-layer'),
				oW=oL.find('.wrap'),
				oT=oW.find('.title'),
				oC=oW.find('.content'),
				aA=oW.find('.button a');
			
			oT.html(sT);
			oC.html(sC);
			aA.eq(0).html(sO);
			oW.css('top',($(window).height()-oW.height()-2)/2);
			
			s&&aA.eq(0).css('box-shadow','none');
			
			aA.eq(0).on('click',function(){
				$('body').css('overflow','auto');
				oL.remove();
				fO&&fO();
			});
			
			aA.eq(1).on('click',function(){
				$('body').css('overflow','auto');
				oL.remove();
				fC&&fC();
			});
		}
		
	})
})(Zepto);

*/
;D={
	//让页面滚动到指定高度
	toWhere:function(t,s){
		var w=$(window),
			s=s || 0.3;
		clearInterval(window.weiT);
		window.weiT=setInterval(function(){
			var is=w.scrollTop(),
				ic=(t-is)*s;
			is+=(is>t?Math.floor(ic):Math.ceil(ic));
			w.scrollTop(is);
			if(is<t+1 && is>t-1)clearInterval(window.weiT),w.scrollTop(t);
		},30);
	},
	
	//返回页面顶部
	toTop:function(s){
		D.toWhere(0,s);
	},
	
	//去到页面底部
	toBottom:function(s){
		D.toWhere($(document).height()-$(window).height(),s);
	},
	
	//模拟alert
	alert:function(o){
		D.confirm(o,'1');
	},
	
	//模拟confirm
	confirm:function(o,s){
		$('#wei-layer').remove();
		sCan=s?'':'<a href="javascript:;">'+(o.cancel||'取消')+'</a>';
		$('body').append('<div id="wei-layer"><section class="wrap wrap-animate"><h3 class="title"></h3><div class="content"></div><p class="button"><a href="javascript:;"></a>'+sCan+'</p></section></div>').css('overflow','hidden');
		
		var sT=o.title||'温馨提示',
			sC=o.content,
			sO=o.ok||'确定',
			fO=o.fOk||null,
			fC=o.fCancel||null,
			
			oL=$('#wei-layer'),
			oW=oL.find('.wrap'),
			oT=oW.find('.title'),
			oC=oW.find('.content'),
			aA=oW.find('.button a');
		
		oT.html(sT);
		oC.html(sC);
		aA.eq(0).html(sO);
		oW.css('top',($(window).height()-oW.height()-2)/2);
		
		s&&aA.eq(0).css('box-shadow','none');
		
		aA.eq(0).on('click',function(){
			$('body').css('overflow','auto');
			oL.remove();
			fO&&fO();
		});
		
		aA.eq(1).on('click',function(){
			$('body').css('overflow','auto');
			oL.remove();
			fC&&fC();
		});
	}
	
};