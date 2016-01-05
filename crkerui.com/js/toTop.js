//返回顶部、搜索框
(function(){
	var d=document,
		btn=d.getElementById('toTop'),
		oS=d.getElementById('search') || d.getElementById('page-search'),
		oT=oS.getElementsByTagName('input')[0],
		oSub=oS.getElementsByTagName('input')[1],
		str='轻轻松松，搜索一下...';
	
	//搜索框
	oT.value=str;
	css(oT,{color:'#666'});
	oSub.onclick=function(){
		var v=oT.value;
		if(v && v!=str){
			return true;
		}else{
			oT.focus();
			return false;
		}
	};
	
	oSub.onmouseout=function(ev){
		var ev=ev||event;
		ev.cancelBubble=true;
	}
	
	oS.onmouseout=function(){
		oT.blur();
	};
	oT.onfocus=function(){
		if(this.value==str){
			this.value=''
		}
	}
	oT.onblur=function(){
		if(!this.value){
			this.value=str;
		}
	}
		
	window.onscroll=set;
	
	btn.onclick=function(){
		css(btn,{display:'none'});
		window.onscroll=null;
		
		this.timer=setInterval(function(){
			if(d.body.scrollTop){
				d.body.scrollTop-=Math.ceil(d.body.scrollTop*0.1);
			}else{
				d.documentElement.scrollTop-=Math.ceil(d.documentElement.scrollTop*0.1);
			}
			
			if(d.body.scrollTop==1){
				clearInterval(btn.timer),
				d.body.scrollTop=0,
				window.onscroll=set;
			}
			if(d.documentElement.scrollTop==1){
				clearInterval(btn.timer),
				d.documentElement.scrollTop=0,
				window.onscroll=set;
			}
		},10);
	};
	
	function set(){
		var s=(d.body.scrollTop||d.documentElement.scrollTop)>120?'block':'none';
		css(btn,{display:s});
		if(s=='block'){
			css(oS,{bottom:'170px'})
		}else{
			css(oS,{bottom:'20px'})
		}
	}set();
})();
