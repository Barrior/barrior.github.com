function bindEvent(obj,evName,fn){
	obj.attachEvent?obj.attachEvent('on'+evName,function(){
		if(fn.call(obj)==false){
			event.cancelBubble=true;
			return false;
		}
	}):obj.addEventListener(evName,function(ev){
		if(fn.call(obj)==false){
			ev.preventDefault();
			ev.stopPropagation();
		}
	},false);
}

function offEvent(obj,evName,fn){
	obj.attachEvent?obj.detachEvent('on'+evName,function(){
		fn.call(obj);
	}):obj.removeEventListener(evName,fn,false);
}

function toArray(elements){
	var arr=[];
	for(var i=0; i<elements.length; i++){
		arr.push(elements[i]);
	}
	return arr;
}

function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return toArray(oParent.getElementsByClassName(sClass));
	}else{
		var aEle=oParent.getElementsByTagName('*'),
			reg=new RegExp('(^|\\s)'+sClass+'($|\\s)'),
			arr=[],
			i=0,
			iLen=aEle.length;
		for(; i<iLen; i++){
			if(reg.test(aEle[i].className)) arr.push(aEle[i]);
		}
		return arr;
	}
}

function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			document.removeEventListener('DOMContentLoaded',arguments.callee,false);
			fn();
		},false);
	}else{
		(function(){
			try{
				document.documentElement.doScroll('left');
			}catch(e){
				return setTimeout(arguments.callee,5);
			}
			fn();
		})();
	}
}

function MQuery(vArg){
	
	this.elements=[];
	
	switch(typeof vArg){
		case 'function':
			ready(vArg);
			break;
		case 'string':
			switch(vArg.charAt(0)){
				case '#':
					this.elements.push(document.getElementById(vArg.substring(1)));
					break;
				case '.':
					this.elements=getByClass(document,vArg.substring(1));
					break;
				default:
					this.elements=toArray(document.getElementsByTagName(vArg));
			}
			break;
		case 'object':
			if(vArg.constructor==Array){
				this.elements=vArg;
			}else{
				this.elements.push(vArg);
			}
			break;
	}
	
}


MQuery.prototype.find=function(str){
	var arr=[];
	if(str.charAt(0)=='.'){
		for(var i=0; i<this.elements.length; i++){
			arr=arr.concat(getByClass(this.elements[i],str.substring(1)));
		}
	}else{
		for(var i=0; i<this.elements.length; i++){
			arr=arr.concat(toArray(this.elements[i].getElementsByTagName(str)));
		}
	}
	return $(arr);
};

MQuery.prototype.eq=function(iNum){
	return $(this.elements[iNum]);
};

MQuery.prototype.index=function(){
	var aElems=this.elements[0].parentNode.children;
	for(var i=0; i<aElems.length; i++){
		if(aElems[i]==this.elements[0]){
			return i;
		}
	}
};

MQuery.prototype.attr=function(vArg){	//兼容性未做考虑setAttribute & getAttribute
	switch(typeof vArg){
		case 'object':
			for(var j in vArg){
				for(var i=0; i<this.elements.length; i++){
					this.elements[i].setAttribute(j,vArg[j]);
				}
			}
			break;
		case 'string':
			if(arguments.length==2){
				for(var i=0; i<this.elements.length; i++){
					this.elements[i].setAttribute(arguments[0],arguments[1]);
				}
			}else{
				if(this.elements[0].getAttribute(arguments[0])!=null){
					return this.elements[0].getAttribute(arguments[0]);
				}else{
					return this.elements[0].getAttribute('className');
				}
			}
	}
	return this;
};

MQuery.prototype.css=function(vArg){
	switch(typeof vArg){
		case 'object':
			for(var i in vArg){
				for(var j=0; j<this.elements.length; j++){
					this.elements[j].style[i]=vArg[i];
					if(i=='opacity'){
						this.elements[j].style.filter='alpha(opacity:'+vArg[i]*100+')';
					}
				}
			}
			break;
		case 'string':
			if(arguments.length==2){
				for(var i=0; i<this.elements.length; i++){
					this.elements[i].style[vArg]=arguments[1];
				}
			}else{
				var attr=vArg.replace(/\s/g,'');
				return this.elements[0].currentStyle ? this.elements[0].currentStyle[attr] : getComputedStyle(this.elements[0],null)[attr];
			}
			break;
	}
	return this;
};

MQuery.prototype.css3=function(vArg){
	switch(typeof vArg){
		case 'object':
			for(var i in vArg){
				var newi=i.replace(i.charAt(0),i.charAt(0).toUpperCase());
				for(var j=0; j<this.elements.length; j++){
					this.elements[j].style['webkit'+newi]=vArg[i];
					this.elements[j].style['moz'+newi]=vArg[i];
					this.elements[j].style['ms'+newi]=vArg[i];
					this.elements[j].style['o'+newi]=vArg[i];
					this.elements[j].style[i]=vArg[i];
				}
			}
			break;
		default:
			var attr=vArg.replace(vArg.charAt(0),vArg.charAt(0).toUpperCase());
			for(var i=0; i<this.elements.length; i++){
				this.elements[i].style['webkit'+attr]=arguments[1];
				this.elements[i].style['moz'+attr]=arguments[1];
				this.elements[i].style['ms'+attr]=arguments[1];
				this.elements[i].style['o'+attr]=arguments[1];
				this.elements[i].style[vArg]=arguments[1];
			}
	}
	return this;
};

MQuery.prototype.html=function(str){
	if(str){
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].innerHTML=str;
		}
	}else{
		return this.elements[0].innerHTML;
	}
	return this;
};

MQuery.prototype.siblings=function(sTag){
	var aElems,arr=[];
	if(sTag){
		aElems=this.elements[0].parentNode.getElementsByTagName(sTag);
	}else{
		aElems=this.elements[0].parentNode.children;
	}
	for(var i=0; i<aElems.length; i++){
		if(aElems[i]!=this.elements[0]){
			arr.push(aElems[i]);
		}
	}
	return $(arr);
};

MQuery.prototype.on=function(sEvents,fn){
	for(var i=0; i<this.elements.length; i++){
		bindEvent(this.elements[i],sEvents,fn);
	}
	return this;
};

/*MQuery.prototype.off=function(sEvents,fn){
	for(var i=0; i<this.elements.length; i++){
		offEvent(this.elements[i],sEvents,fn)
	}
};*/

MQuery.prototype.hover=function(fnOver,fnOut){
	this.on('mouseover',fnOver);
	this.on('mouseout',fnOut);
	return this;
};

function $(vArg){
	return new MQuery(vArg);
}
