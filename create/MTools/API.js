$('#to-top').on('touchend',function(){
	D.toTop();
	/*
	 * $().toTop([0.3])，返回页面顶部
	 * $().toBottom([0.3])，去到页面底部
	 * 以上0.3：运动速度，可选参数
	 * 
	 * $().toWhere(500[,0.3])，让页面滚动到指定高度
	 * 500：到达的指定位置，必需
	 * 0.3：运动速度，可选
	 * 
	 */
});

$('#alert').on('touchend',function(){
	D.alert({
		title:'这里是标题',	//可选，默认为：温馨提示
		content:'这里是内容内容内容内容内容内容内容',	//必需
		ok:'这里是确定',	//可选，默认为：确定
		fOk:function(){
			alert('点击的是alert的确定')
		}	//可选，点击【确定】后执行的函数
	});
});

$('#confirm').on('touchend',function(){
	D.confirm({
		title:'这里是标题',	//可选，默认为：温馨提示
		content:'这里是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',	//必需
		ok:'这里是确定',	//可选，默认为：确定
		cancel:'这里是取消',	//可选，默认为：取消
		fOk:function(){
			alert('你点击的是confirm确定')
		},	//可选，点击【确定】后执行的函数
		fCancel:function(){
			alert('你点击的是取消')
		}	//可选，点击【取消】后执行的函数
	});
});