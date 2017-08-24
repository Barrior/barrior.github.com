function YCharts(sSelect){
	this.Box=d3.select(sSelect).style('overflow','hidden');
	this.svg=this.Box.append('svg').attr({
		width:'100%',height:'100%',xmlns:'http://www.w3.org/2000/svg',
		'font-size':12,
		'font-family':'微软雅黑'
	});
	this.svgWidth=parseInt( this.svg.style('width') );
	this.svgHeight=parseInt( this.svg.style('height') );
	this.gTitle=this.svg.append('g').attr({id:'g-title'}).style('display','none');
	this.gKChart=this.svg.append('g').attr({id:'g-kchart',transform:'translate(0,30)'});
	this.gMask=this.svg.append('g').attr({id:'g-kchart-mask',transform:'translate(0,30)'});
	this.gCross=this.svg.append('g').attr({id:'g-cross',transform:'translate(0,30)'});
	
	this.Data=null;
	this.KDataLen=0;
	this.maxData=0;
	this.minData=0;
	this.dataHeight=0;	//数据虚拟高度
	this.gKChartHeight=this.svgHeight-30;	//K线实际高度
	this.scaleHeight=0;	//数据与实际高度的比值
	this.iKWidth=0;
	this.iSpaceWidth=0;
	
	this.settings={
		hasHist:false,
		cross:false
	}
}

YCharts.prototype.KChart=function(KData,Options){
	
	if(Options){
		for(var i in Options){
			this.settings[i]=Options[i]
		}
	}
	
	this.Data=KData;
	this.KDataLen=KData.length;
	
	var oMaxOrMin=maxOrMin(this.KDataLen,KData);
	this.maxData=oMaxOrMin.max;
	this.minData=oMaxOrMin.min;
	
	if(this.settings.hasHist){
		this.gKChartHeight=this.gKChartHeight*0.77
	}
	this.dataHeight=this.maxData-this.minData;
	this.scaleHeight=this.gKChartHeight/this.dataHeight;
	this.iKWidth=this.svgWidth*0.8/this.KDataLen;	//k width
	this.iSpaceWidth=this.svgWidth*0.2/(this.KDataLen-1);	//space width
	
	this.createTitle();
	this.createKChart();
	this.mask();
	
	if(this.settings.hasHist){
		this.createHist()
	}
	this.createBalloon();
	
};

YCharts.prototype.createTitle=function(){
	//时间：2014-12-18 0:0 | 开：14.22 | 高：14.34 | 低：13.71 | 收：13.89
	var oText=this.gTitle.append('text').attr('y',20),
		arr=['时间：','开：','高：','低：','收：'],
		oTspan,
		i=0;
	
	for(; i<14; i++){
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
YCharts.prototype.createKChart=function(){
	var oG,calc,
		i=0,
		d=this.Data,
		shadownX=parseInt(this.iKWidth/2);
	
	for(; i<this.KDataLen; i++){
		oG=this.gKChart.append('g').attr({
			transform:'translate('+
			parseInt( (this.iKWidth+this.iSpaceWidth)*i )+','+
			parseInt( (this.maxData-d[i][2])*this.scaleHeight )+')'
		});
			
		calc=d[i][1]-d[i][4];	//开盘价-收盘价
		if( calc>0 ){	//阴线，绿色
			chart(2,1,4,3,'#33AA11',this)
			
		}else if(calc<0){	//阳线，红色
			chart(2,4,1,3,'#DD2200',this)
			
		}else{	//白线
			chart(2,4,1,3,'#000',this)
		}
	}
	function chart(maxNum,nextNum,prevNum,minNum,color,This){
		var iTopHeight=parseInt( (d[i][maxNum]-d[i][nextNum])*This.scaleHeight ),
			iBottomHeight=parseInt( (d[i][prevNum]-d[i][minNum])*This.scaleHeight ),
			iKRectHeight=parseInt( Math.abs(calc)*This.scaleHeight );
		
		oG.append('rect').attr({	//上影线
			x: shadownX,
			y: 0,
			width: 1,
			height: iTopHeight,
			fill: color
		});
		oG.append('rect').attr({	//阴、阳线实体
			x: 0,
			y: iTopHeight,
			width: parseInt( This.iKWidth ),
			height: iKRectHeight==0?1:iKRectHeight,
			fill: color
		});
		oG.append('rect').attr({	//下影线
			x: shadownX,
			y: iTopHeight+iKRectHeight,
			width: 1,
			height: iBottomHeight,
			fill: color
		})
	}
};

YCharts.prototype.mask=function(){
	var oHCross,oVCross,
		i=0,
		max=this.maxData,
		scale=this.scaleHeight,
		d=this.Data,
		w=this.svgWidth,
		h=this.svgHeight-30,
		shadownX=parseInt( this.iKWidth/2 ),
		
		oGTitle=this.gTitle,
		rectWidth=this.iKWidth+this.iSpaceWidth,
		rectHeight=this.svgHeight-30;
	
	for(; i<this.KDataLen; i++){
		this.gMask.append('rect').attr({
			width: rectWidth,
			height: rectHeight,
			x: parseInt( rectWidth*i ),
			y: 0,
			fill: 'transparent',
			index: i
		})
	}
	
	this.createCross();
	oHCross=d3.select('#hCross');
	oVCross=d3.select('#vCross');
	
	this.gMask[0][0].addEventListener('mouseover',function(e){
		var i=e.target.getAttribute('index'),
			x=parseInt( rectWidth*i ) + shadownX + 0.5,
			y=parseInt( (max-d[i][1])*scale ),
			aTspan=oGTitle.selectAll('tspan')[0],
			transformDate=function(sDate){
				var oDate = new Date( sDate ),
					Y=oDate.getFullYear()+'-',
					M=(oDate.getMonth()<9?'0'+(oDate.getMonth()+1):oDate.getMonth()+1)+'-',
					D=(oDate.getDate()<10?'0'+oDate.getDate():oDate.getDate())+' ',
					h=oDate.getHours()+':',
					m=oDate.getMinutes();
				return Y+M+D+h+m
			};
			
		d[i][1]-d[i][4]<0?y-=1.5:y-=0.5;
		
		oGTitle.style('display','block');
		oVCross.attr('d','M'+x+' 0L'+x+' '+h);
		oHCross.attr('d','M0 '+y+'L'+w+' '+y);
		
		aTspan[1].textContent=transformDate(d[i][0]);
		aTspan[4].textContent=d[i][1];
		aTspan[7].textContent=d[i][2];
		aTspan[10].textContent=d[i][3];
		aTspan[13].textContent=d[i][4]
	},false);
	
	this.gMask.on('mouseout',function(){
		oGTitle.style('display','none');
		oHCross.attr('d','');
		oVCross.attr('d','')
	})
};

YCharts.prototype.createCross=function(){
	if(this.settings.cross){
		this.gCross.append('path').attr({id:'hCross',stroke:'#666'})
	}
	this.gCross.append('path').attr({id:'vCross',stroke:'#666'})
};

YCharts.prototype.createHist=function(){
	var iMaxHist,iScaleHist,h,c,oRect,oGHist,
		i=0,
		j=0,
		arr=[],
		d=this.Data,
		oGHistHeight=this.svgHeight-this.gKChartHeight-51,	//30+10+1+10
		rectW=parseInt( this.iKWidth ),
		rectX=this.iKWidth+this.iSpaceWidth,
		
		iLineX2=this.svgWidth,
		iLineY=this.gKChartHeight+40.5;	//this.gKChartHeight+30+10+0.5
		
	this.svg.append('line').attr({	//创建分界线
		x1: 0,
		y1: iLineY,
		x2: iLineX2,
		y2: iLineY,
		stroke:'#666'
	});
	
	
	for(; i<this.KDataLen; i++){
		arr.push( d[i][5] )
	}
	iMaxHist=Math.max.apply(null,arr);
	iScaleHist=oGHistHeight/iMaxHist;
	
	oGHist=this.svg.append('g').attr({
		id:'g-hist',
		transform:'translate(0,'+(this.gKChartHeight+51.5)+')'
	})
	
	for(; j<this.KDataLen; j++){
		h=d[j][5]*iScaleHist;
		c=d[j][1]-d[j][4];
		oRect=oGHist.append('rect').attr({
			width: rectW,
			height: h+2,
			x: parseInt( rectX*j ),
			y: parseInt( oGHistHeight-h )+0.5
		});
		
		if( c>0 ){	//阴线，绿色
			oRect.attr('fill','#33AA11')
		}else if( c<0 ){	//阳线，红色
			oRect.attr('fill','#DD2200')
		}
	}
	this.svg[0][0].insertBefore(oGHist[0][0],this.gMask[0][0])	//将【柱状图】放置【遮罩】的前面
};

YCharts.prototype.createBalloon=function(){
	var oGBalloon,o,oG,
		i=0,
		rectWidth=this.iKWidth+this.iSpaceWidth,
		shadownX=parseInt( this.iKWidth/2 );
		
	
	oGBalloon=this.svg.append('g').attr({
		id:'g-balloon',
		transform:'translate(0,30)'
	});
	for(; i<this.KDataLen; i++){
		o=this.Data[i][6];
		if(o){
			oG=oGBalloon.append('g').attr({
				cursor:'pointer',
				transform:'translate('+
							( parseInt( rectWidth*i )+shadownX-8.5 )+','+
							parseInt( (this.maxData-this.Data[i][2])*this.scaleHeight-26 )+')'
			});
			oG.append('path').attr({
				d:'M6.7,0C3,0,0,3,0,6.7C0,10.5,6.7,18,6.7,18s6.7-7.5,6.7-11.2C13.5,3,10.5,0,6.7,0z',
				fill:'#DD4B39',
				transform:'scale(1.3)'
			});
			oG.append('text').text(o.letter).attr({
				x: 4.5,
				y: 14,
				fill: "#fff"
			});
			oG.append('title').text(o.title)
		}
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

function Y(sSelect){
	return new YCharts(sSelect)
}
