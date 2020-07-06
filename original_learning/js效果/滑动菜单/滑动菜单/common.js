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
	var hash = location.hash;
	hash = hash.split('#')[1] || 'home';
	var oNav=document.getElementById('nav');
	var aA=oNav.getElementsByTagName('a');
	var oDiv=document.getElementById('slide');
	var oA=document.getElementsByClassName('active')[0];
	
	var now=0;
	
	for(var i=0; i<aA.length; i++){
		aA[i].index=i;
		aA[i].onclick = function(){
			oA = this;
		}
		aA[i].onmouseover=function(){
/*			if(this.className==='active'){
				return true;
			};*/
			for(var i=0; i<aA.length; i++){
				aA[i].className='';
			}
			this.className='active';
			startMove(oDiv,100*this.index); //还可以用left:this.offsetLeft;
		};
		aA[i].onmouseout=function(){
/*			if(this.className==='active'){
				return true;
			};*/
			for(var i=0; i<aA.length; i++){
				aA[i].className='';
			}
			aA[this.index].className='active';
			startMove(oDiv,100*oA.index);
		};
		
	}
};