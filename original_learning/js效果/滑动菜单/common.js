var iSpeed=0;
var left=0;
function startMove(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		iSpeed+=(iTarget-obj.offsetLeft)/5;
		iSpeed*=0.7;
		
		left+=iSpeed;
		
		if(Math.abs(obj.iSpeed)<1 && Math.abs(left-iTarget)<1){
			clearInterval(obj.timer);
			obj.style.left=iTarget+'px';
		}
		else{
			obj.style.left=left+'px';
		}
	},30);
}

window.onload=function(){
	var oNav=document.getElementById('nav');
	var aA=oNav.getElementsByTagName('a');
	var oDiv=document.getElementById('slide');
	var oA=document.getElementsByClassName('active')[0];
	
	//var now=0;
	
	for(var i=0; i<aA.length; i++){
		aA[i].index=i;
		var now=oA.index;
		
		aA[i].onclick=function(){
			now=this.index;
			oDiv.style.left=100*this.index;
		};
		
		aA[i].onmouseover=function(){
			//if(this.className==='active')return;
			for(var i=0; i<aA.length; i++){
				aA[i].className='';
			}
			this.className='active';
			startMove(oDiv,100*this.index); //还可以用left:this.offsetLeft;
		};
		
		aA[i].onmouseout=function(){
			//if(this.className==='active')return;
			for(var i=0; i<aA.length; i++){
				aA[i].className='';
			}
			aA[now].className='active';
			startMove(oDiv,100*now);
		};
		
	}
};