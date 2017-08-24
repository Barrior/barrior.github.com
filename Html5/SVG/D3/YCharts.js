function YCharts(sSelect){
	this.Box=d3.select(sSelect);
	this.svg=this.Box.append('svg').attr({
		width:'100%',height:'100%',xmlns:'http://www.w3.org/2000/svg',
		'font-size':12,
		'font-family':'微软雅黑'
	});
	this.svgWidth=parseInt( this.svg.style('width') );
	this.svgHeight=parseInt( this.svg.style('height') );
	this.gTitle=this.svg.append('g').attr({id:'g-title'});
	this.gKChart=this.svg.append('g').attr({id:'g-kchart',transform:'translate(0,30)'});
	
	this.KDataLen=0;
	this.maxData=0;
	this.minData=0;
	this.dataHeight=0;	//数据虚拟高度
	this.gKChartHeight=this.svgHeight;	//K线实际高度
	this.scaleHeight=0;	//数据与实际高度的比值
}

YCharts.prototype.KChart=function(KData,Options){
	
	this.KDataLen=KData.length;
	
	var oMaxOrMin=maxOrMin(this.KDataLen,KData);
	this.maxData=oMaxOrMin.max;
	this.minData=oMaxOrMin.min;
	this.dataHeight=this.maxData-this.minData;
	this.scaleHeight=this.gKChartHeight/this.dataHeight;
	
	this.creatTitle();
	this.createKChart(KData);

};

YCharts.prototype.creatTitle=function(){
	//时间：2014-12-18 0:0 | 开：14.22 | 高：14.34 | 低：13.71 | 收：13.89
	var oText=this.gTitle.append('text').attr('y',20),
		arr=['时间','开','高','低','收'],
		oTspan,
		i;
	
	for(i=0; i<14; i++){
		oTspan=oText.append('tspan');
		if(i%3==0) oTspan.text(arr[i/3]).attr('dx',10);
		if(i%3==2) oTspan.text('|').attr('dx',10);
	}
};

/*
	[1415894400000,"10.88","10.98","10.75","10.91","16206.79"]
	   时间戳，开盘，最高，最低，收盘，成交量
	 time，open，high，low，close，turnover
*/
YCharts.prototype.createKChart=function(KData){
	var oG,i,calc,
		iKWidth=this.svgWidth*0.8/this.KDataLen,
		iSpaceWidth=this.svgWidth*0.2/(this.KDataLen-1),
		shadownWidth=iKWidth/2-0.5;
	
	for(i=0; i<this.KDataLen; i++){
		oG=this.gKChart.append('g').attr({
			transform:'translate('+
			parseInt( (iKWidth+iSpaceWidth)*i )+','+
			//(this.maxData-KData[i][2]*this.scaleHeight)+')'
			//200+')'
			(this.gKChartHeight-(KData[i][2]-KData[i][3])/this.dataHeight*this.gKChartHeight)+')'

		});
			console.log( KData[i][2]-KData[i][3] )
			console.log( this.dataHeight )
			console.log( this.gKChartHeight )
			
		calc=KData[i][1]-KData[i][4];	//开盘价-收盘价
		if( calc>0 ){	//阴线，绿色
			chart(2,1,4,3,'#33AA11',this)
			
		}else if(calc<0){	//阳线，红色
			chart(2,4,1,3,'#DD2200',this)
			
		}else{	//白线
			chart(2,4,1,3,'#000',this);
		}
	}
	function chart(maxNum,nextNum,prevNum,minNum,color,This){
		var iTopHeight=parseInt( (KData[i][maxNum]-KData[i][nextNum])*This.scaleHeight ),
			iBottomHeight=parseInt( (KData[i][prevNum]-KData[i][minNum])*This.scaleHeight ),
			iKRectHeight=parseInt( Math.abs(calc)*This.scaleHeight );
		
		oG.append('rect').attr({	//上影线
			x: shadownWidth,
			y: 0,
			width: 1,
			height: iTopHeight,
			fill: color
		});
		oG.append('rect').attr({	//阴、阳线实体
			x: 0,
			y: iTopHeight,
			width: parseInt( iKWidth ),
			height: iKRectHeight==0?1:iKRectHeight,
			fill: color
		});
		oG.append('rect').attr({	//下影线
			x: shadownWidth,
			y: iTopHeight+iKRectHeight,
			width: 1,
			height: iBottomHeight,
			fill: color
		})
	}
};

function maxOrMin(len,KData){
	var arr=[];
	while(len--){
		arr.push(KData[len][2],KData[len][3])
	}
	return {
		max: Math.max.apply(null,arr),
		min: Math.min.apply(null,arr)
	}
}

function toInt(num){
	return parseInt(num)
}

function Y(sSelect){
	return new YCharts(sSelect)
}
