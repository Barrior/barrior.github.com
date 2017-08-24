Y={
	timeChart:function(sSelect,aData){
				iLen=aData.length;
				yAxis=[];
				for(i=0; i<iLen; i++){
					yAxis.push(aData[i].y-0)
				}
				xAxis=['09:30', '10:30', '11:30', '14:00', '15:00'];
				//yAxis=[30.21, 32.01, 33.28, 34.56, 30.45, 35.22, 34.63];
				//---------------------defined above data-----------------------------------
			
				oBox=document.querySelector(sSelect);
				
				iBW=parseInt( getComputedStyle(oBox,null).width );
				iBH=parseInt( getComputedStyle(oBox,null).height );
				
				oSvg=Snap(iBW,iBH);
				
				oBox.appendChild(oSvg.node);
				//---------------------create svg------------------------------------------
				
				//define default values
				margin={
					top:24,
					left:0,
					right:50,
					bottom:20
				};
				iCanvasW=iBW-margin.right;
				iCanvasH=iBH-margin.top-margin.bottom;
			
				//data to determine the proportion of the canvas
				aYSort=yAxis.concat().sort(function(a,b){return a-b});
				yMax=aYSort[iLen-1];
				yMin=aYSort[0];
				
				var iHLen=10;	//要显示文本的横线条数，也是y轴文本的个数
				dataHeight=yMax-yMin;	//数据高度
				
				if(dataHeight<=0.01){
					iHLen=1;
					
				}else if(0.01<dataHeight && dataHeight<=0.1){
					iHLen=Math.ceil( dataHeight*100 );
					
				}else if(0.1<dataHeight && dataHeight<=1){
					iHLen=Math.ceil( dataHeight*10 );
					if(1<iHLen && iHLen<=5){
						iHLen=10;
					}
					
				}else if(1<dataHeight && dataHeight<=10){
					iHLen=Math.ceil( dataHeight );
					if(1<iHLen && iHLen<=5){
						iHLen=10;
					}
				}
				
				if(iHLen>10)iHLen=10;
				
				scaleHeight=iCanvasH/iHLen; //实际页面高度的均值
				scaleData=dataHeight/iHLen;	//数据高度均值
//				scaleData=ceil(scaleData);	//取整，比如0.0169 -> 0.02
//				
//				function ceil(num){
//					sNum=num.toString();
//					
//					if(0.01<=num && num<0.1){
//						start=sNum.replace(/(.+\.\d)\d*/,'$1');
//						end=sNum.replace(/.+\.\d(\d)\d*/,'$1')-0+1+'';
//						
//						return start+end-0;
//					}
//				}
				console.log(scaleData)
				
				yMargin=scaleHeight*1.5;
				yMarginTop=scaleHeight*.7;
				yTopData=yMax+scaleData*.7;
				
				/*//if(scaleData<0.01){
					yMargin=0;
					yMarginTop=0;
					yTopData=yMax;
				//}*/
				
				//create a background layer
				oGBgLine=oSvg.paper.g().attr({
					transform:'translate(0,'+margin.top+')'
				});
				
				//Create iHlen horizontal lines and y-axis text
				for(i=0; i<=iHLen; i++){
					xLine=oSvg.paper.line(
						0,iCanvasH/iHLen*i,
						iCanvasW,iCanvasH/iHLen*i
					).attr({
						stroke:'#ccc',
					});
					
					if(i!=iHLen){	//让最底下的一条横线的y轴数据不画
						text=addZero( (yTopData*100-scaleData*i*100)/100+'' );
						
						yText=oSvg.paper.text(
							iCanvasW+4,
							iCanvasH/iHLen*(i+0.1),
							text
						);
					}
					oGBgLine.add(xLine,yText);
				}
				function addZero(text){
					var sAddZero;
					reText=text.replace(/.+\.(\d{0,2}).*/,'$1');
					switch(reText.length){
						case 0:
							sAddZero=reText+00;
							break;
						case 1:
							sAddZero=reText+0;
							break;
						default:
							sAddZero=reText;
					}
					return text.replace(/(.+\.).*/,'$1')+sAddZero;
				}
				
				//create 5 vertical lines and x-axis text
				for(i=0; i<5; i++){
					yLine=oSvg.paper.line(iCanvasW/4*i,0, iCanvasW/4*i,iCanvasH).attr({
						stroke:'#ccc',
					});
					
					anchorValue='middle';
					if(i==0)anchorValue='start';
					if(i==4)anchorValue='end';
					xText=oSvg.text(iCanvasW/4*i, iCanvasH, xAxis[i]).attr({
						'text-anchor':anchorValue,
						dy:14
					});
					
					oGBgLine.add(yLine, xText);
				}
				
				//create a path, a path-bg, copyright
				var d;
				for(i=0; i<aData.length; i++){
					d?d+='L':d='M';
					d+=iCanvasW/240*i+','+
						( (yMax-yAxis[i])/dataHeight*(iCanvasH-yMargin)+yMarginTop );
				}
				
				coord=d.replace(/.+L(.+)$/,'$1').split(',');
				xCoord='-'+coord[0];
				yCoord=coord[1]-0;
				dBg=d+'v'+(iCanvasH-yCoord)+'h'+xCoord+'Z';
				
				oPathLine=oSvg.paper.path(d).attr({
					stroke:'#418FCF',
					fill:'none'
				});
				
				oPathBg=oSvg.paper.path(dBg).attr({
					fill:'#418FCF',
					opacity:.4
				});
				
				oCopyRight=oSvg.paper.text(
					4,
					iCanvasH-4,
					'©Yunvs.com'
				).attr({
					fill:'#666',
					'font-family':'Arial, Helvetica',
					opacity:.6
				});
				
				oGBgLine.add( oCopyRight, oPathBg, oPathLine );
				//---------------------create a path, a path-bg, copyright--------------
				
				//create dot
				oDot=oSvg.paper.circle(0,0,4).attr({
					fill:'#418fcf',
					'visibility':'hidden'
				})
				oGBgLine.add( oDot );
				
				//create 241 rects
				for(i=0; i<241; i++){
					oRect=oSvg.paper.rect(
						iCanvasW/240*i-iCanvasW/480,	//iCanvasW/480=iCanvasW/240/2
						0,
						i==240 ? iCanvasW/480 : iCanvasW/240,	//最后一个矩形的后一半裁剪掉
						iCanvasH
					).attr({
						opacity:0
					});
					oGBgLine.add( oRect );
				}
				
				//header information
				oHXLine=oSvg.paper.line(0,0, iCanvasW,0).attr('stroke','#ccc');
				oHLeftLine=oSvg.paper.line(0,0, 0,margin.top).attr('stroke','#ccc');
				oHRightLine=oSvg.paper.line(iCanvasW,0, iCanvasW,margin.top).attr('stroke','#ccc');
				
				oHText=oSvg.paper.text(0,0,[
					'当前价：',aData[0].y,
					'跌涨幅：',aData[0].zdf+'%',
					'时间：',aData[0].time
				]).attr({
					y: margin.top/1.5,
					id: 'header-text'
				});
			
				oGHeader=oSvg.paper.g(oHXLine, oHLeftLine, oHRightLine, oHText);
				
				//tspan隔行样式设置
				aTspan=oGHeader.selectAll('tspan');
				for(i=0; i<6; i++){
					if(i%2==0){
						aTspan[i].attr({
							fill:'#888888',
							dx:10
						})
					}
				}
				//---------------------header information-----------------------------------------
				//mouse into the display dots effect
				aRect=oSvg.selectAll('rect');
				aTspan=document.querySelectorAll('#header-text tspan');
				
				aRect.forEach(function(element,i){
					element.hover(function(){
						if( aData[i] ){
							aTspan[1].textContent=aData[i].y;
							aTspan[3].textContent=aData[i].zdf+'%';
							aTspan[5].textContent=aData[i].time;
							oDot.attr({
								'visibility':'visible',
								cx:iCanvasW/240*i,
								cy:(yMax-yAxis[i])/dataHeight*(iCanvasH-yMargin)+yMarginTop
							});
						}
					},function(){
						oDot.attr('visibility','hidden')
					})
				})
				
				//create icon
				/*oSvg.paper.path('M6.7,0C3,0,0,3,0,6.7C0,10.5,6.7,18,6.7,18s6.7-7.5,6.7-11.2    C13.5,3,10.5,0,6.7,0z').attr({
					fill:'#DD4B39',
					transform:'scale(1.3)',
					id:'icon'
				}).toDefs();*/
				
				for(i=0; i<aData.length; i++){
					if(aData[i].ev){
						oIcon=oSvg.paper.path('M6.7,0C3,0,0,3,0,6.7C0,10.5,6.7,18,6.7,18s6.7-7.5,6.7-11.2    C13.5,3,10.5,0,6.7,0z').attr({
							fill:'#DD4B39',
							transform:'scale(1.3)'
						});
						oIconText=oSvg.paper.text(0,0,aData[i].ev.letter).attr({
							x:4.5,
							y:14,
							fill:'#fff'
						});
						oTitle=document.createElementNS('http://www.w3.org/2000/svg','title');
						oTitle.textContent=aData[i].ev.title;
						oTitle.setAttribute('class','icon-title');
						oTitle.setAttribute('index',i);
						
						oGIcon=oSvg.paper.g(oIcon,oIconText).attr({
							onOff:'1',
							index:aData[i].ev.letter,
							class:'g-icon',
							style:'cursor:pointer',
							'transform':'translate('+(iCanvasW/240*i-9)+','+
							( (yMax-yAxis[i])/dataHeight*(iCanvasH-yMargin)+yMarginTop )+')',
							//这里没加marginTop是因为margintop和use的高度相抵消了
						});
						oGIcon.append(oTitle);
					}
				}
				
				aGIcon=oSvg.selectAll('.g-icon');
				aGIcon.forEach(function(e,i){
					/*function addHover(elem){
						elem.hover(function(){
							this.select('path').animate({fill:'#FD6609'},400,mina.easeout)
						},function(){
							this.select('path').animate({fill:'#DD4B39'},400,mina.easeout)
						});
					}addHover(e);*/
					
					e.click(function(event){
						var onOff=e.attr('onOff')-0;
						if(onOff){
							oTitle=document.querySelectorAll('.icon-title')[i];
							index=oTitle.getAttribute('index');
							
							var coord=e.attr('transform').string.substring(1),
								coordArr=coord.split(',');

							showTip({
								x:coordArr[0],
								y:coordArr[1]+margin.top,
								index:e.attr('index'),
								elem:e,
								svgBox:sSelect,
								time:aData[index].time,
								title:oTitle.textContent,
								content:aData[index].ev.content
							})
							
							//createLine();
							//this.select('path').attr('fill','#FD6609');
							//this.unhover();
							e.attr('onOff',onOff-1)
						}else{
							closeTip(e.attr('index'));
							//this.select('path').attr('fill','#DD4B39');
							e.attr('onOff',onOff+1)
						}
					})
				});
	}
}
