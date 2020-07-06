(function(){
	var aA=getByClass(document,'case'),
		aD=getByClass(document,'detail'),
		oC=document.getElementById('cartoon'),
		oN=getByClass(oC,'new')[0],
		
		aS=[];
	
	for(var i=0; i<aD.length; i++){
		var e=aD[i].getElementsByTagName('span')[0];
		aS.push(e);
	}
	
	for(var j=0; j<aA.length; j++){
		aA[j].index=j;
		aA[j].onmouseover=function(){
			css(aS[this.index],{color:'#000'});
			if(this.index===10){
				oN.className='new animat';
			}
		};
		aA[j].onmouseout=function(){
			css(aS[this.index],{color:'#0ABCD6'});
			if(this.index===10){
				oN.className='new';
			}
		};
	}
})();

//首页图片淡入淡出效果
(function(){
	var oBg=document.getElementById('bg'),
		aLi=oBg.getElementsByTagName('ul')[0].getElementsByTagName('li'),
		oBtn=getByClass(oBg,'btn')[0],
		aBtnLi=oBtn.getElementsByTagName('li'),
		aImg=oBg.getElementsByTagName('img'),
		iLen=aImg.length,
		iWidth=1920,
		
		num=0,
		timer=null,
		oldNum=0;
		
		//初始化
		css(aLi[0],{display:'block',opacity:1});
		aBtnLi[0].className='active';
		css(aBtnLi[iLen-1],{marginRight:0});
		css(oBtn,{marginLeft:-oBtn.offsetWidth/2+'px'});
		
		window.onresize=resize;
		function resize(){
			viewWidth=document.documentElement.clientWidth;
			if(viewWidth>1118){
				for(var i=0; i<iLen; i++){
					css(aImg[i],{left:(viewWidth-iWidth)/2+'px'});
				}
			}
		}resize();
		
		for(var i=0; i<iLen; i++){
			aBtnLi[i].index=i;
			aBtnLi[i].onmouseover=function(){
				clearInterval(timer);
				if(this.index==num)return;
				num=this.index;
				fade();
				oldNum=num;
			}
			aBtnLi[i].onmouseout=function(){
				timer=setInterval(autoPlay,4000);
			}
		}
		
		function fade(){
			aBtnLi[oldNum].className='';
			startMove(aLi[oldNum],{opacity:0},function(obj){
				css(obj,{display:'none'});
			});
			aBtnLi[num].className='active';
			css(aLi[num],{display:'block'});
			startMove(aLi[num],{opacity:100});
		}
		
		function autoPlay(){
			num++;
			num%=iLen;
			fade();
			oldNum=num;
		}
		
		timer=setInterval(autoPlay,4000);
		
})();