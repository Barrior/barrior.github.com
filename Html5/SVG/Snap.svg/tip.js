function showTip(oJson){
	var oBody=document.body,
		oTip=document.createElement('div'),
		oBox=document.querySelector(oJson.svgBox);
	
	oTip.setAttribute('class','wei-tip');
	oTip.setAttribute('index',oJson.index);
	oTip.innerHTML='<h3 class="title"><strong>'+oJson.title+'</strong><span>'+oJson.time+'</span></h3><div class="content">'+oJson.content+'</div><div class="close"><svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L10 10M10 0L0 10" stroke="#C3C3C3" stroke-width="2"></path></svg></div>';
	
	oBody.appendChild(oTip);
	var iHeight=oTip.offsetHeight;
	oTip.style.left=oJson.x-20+getPos(oBox).left+'px';
	oTip.style.top=oJson.y-30-iHeight+getPos(oBox).top+'px';
	
	drag(oTip);
	
	var oClose=oTip.querySelector('.close');
	oClose.addEventListener('click',function(){
		oBody.removeChild(oTip);
		oJson.elem.attr('onOff','1')
	},false);
}

function closeTip(index){
	var aTip=document.querySelectorAll('.wei-tip');
	if(aTip){
		for(i=0; i<aTip.length; i++){
			if(aTip[i].getAttribute('index')===index){
				document.body.removeChild(aTip[i])
			}
		}
	}
}

function createLine(){
	var oSvg=Snap.select('svg');
	var path=oSvg.paper.path('M0 0L200 200').attr({
			fill:'none',
			stroke:'#FD8B21'
		})
	/*var i=200;
	document.addEventListener('mouseover',function(){
		i++;
		path.attr('d','M0 0L200 '+i)
	},false);*/
}

function drag(obj){
	obj.onmousedown=function(e){
		
		var disX=e.clientX-obj.offsetLeft,
			disY=e.clientY-obj.offsetTop;
		
		function move(e){
			var l=e.clientX-disX,
				t=e.clientY-disY,
				w=document.documentElement.clientWidth-obj.offsetWidth,
				h=document.documentElement.clientHeight-obj.offsetHeight;
			
			if(l<0)l=0;
			if(l>w)l=w;
			if(t<0)t=0;
			if(t>h)t=h;
			
			obj.style.left=l+'px';
			obj.style.top=t+'px';
		}
		document.addEventListener('mouseover',move,false);
		document.addEventListener('mouseup',function(){
			document.removeEventListener('mouseover',move,false);
			document.removeEventListener('mouseup',arguments.callee,false);
		},false);
		return false;
	}
}

function getPos(obj){
	var pos={left:0,top:0};
	while(obj){
		pos.left+=obj.offsetLeft;
		pos.top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return pos;
}
