jQuery.extend({
	
	toWhere:function(iTarget,iSpeed){
		var oWondow=$(window), 
			iSpeed=iSpeed || 0.3;
			
		clearInterval(window.weiTimer);
		window.weiTimer=setInterval(function(){
			
			var iScroll = oWondow.scrollTop(),
			
				iCalc = ( iTarget - iScroll ) * iSpeed;
				
			iScroll+=( iScroll > iTarget ? Math.floor(iCalc) : Math.ceil(iCalc) );
			
			oWondow.scrollTop( iScroll );
			
			if( iScroll < iTarget + 1 && iScroll > iTarget - 1 ){
				clearInterval( window.weiTimer );
				oWondow.scrollTop( iTarget );
			}
		},30);
	},
	
	toTop:function(iSpeed){
		$.toWhere(0,iSpeed);
	},
	
	toBottom:function(iSpeed){
		$.toWhere($(document).height()-$(window).height(),iSpeed);
	}
	
});
