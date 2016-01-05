function getByClass(parent,className){
	var e=parent.getElementsByTagName('*'),
		re=new RegExp('\\b'+className+'\\b'),
		aResult=[];
		
	for(var i=0; i<e.length; i++){
		if(re.test(e[i].className)){
			aResult.push(e[i]);
		}
	}
	return aResult;
}
function css(obj,setAttr){
	for(var i in setAttr){
		obj.style[i]=setAttr[i];
		if(i=='opacity'){
			j=setAttr[i]*100;
			obj.style.filter='alpha(opacity:'+j+')';
		}
	}
}
function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,null)[name];
}
function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
				bStop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd(obj);
		}
	}, 30);
}