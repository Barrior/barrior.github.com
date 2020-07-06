function mousewheel(obj,fn){
				
	obj.onmousewheel===null ? obj.onmousewheel=fun : obj.addEventListener('DOMMouseScroll',fun,false);
	
	function fun(e){
		var e=e || event,
			num=0;
			
		if(e.wheelDelta){
			num=e.wheelDelta>0?1:-1;
		}else{
			num=e.detail<0?1:-1;
		}
		fn(num);
		
		if(e.preventDefault)e.preventDefault();
		return false;
	}
}

/*
 使用方法：
 
        var oDiv=document.getElementById('div');
	        
        mousewheel(oDiv,function(dir){
            if(dir>0) alert('向上滚动');
            if(dir<0) alert('往下滚动');
	    });
            

兼容性：ie6+吧（只测试了ie6+，chrome、Firefox）
 
注释一点点：
	 ie/chrome: onmousewheel
	 ev.wheelDelta:
	 	上：120
	 	下：-120
	 
	 ff: addEventListener('DOMMouseScroll',fn,false) 火狐用鼠标事件要用addEventListener绑定
	 ev.detail:
	 	上：-3
	 	下：3
	 
	 阻止默认事件：
	 	return false 用于阻止一般形式的事件（如：on+事件名称）的默认行为
	 	ev.preventDefault() 用于阻止addEventListener绑定的事件的默认行为
 */