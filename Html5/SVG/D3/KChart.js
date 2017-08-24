;var Y={
	KChart:function(oElem,oData){
			oSvg=d3.select(oElem).append('svg').attr({
				width:'100%', height:'100%',
				'font-size':'12px',
				'font-family':'微软雅黑'
			});
			
			//---------------------define default Attr--------------------------------
			
			oGTitle=oSvg.append('g').style('display','none');
			oTitleText=oGTitle.append('text').attr({'y':20,'id':'text'});
		
			titArr=['时间：','开：','高：','低：','收：'];
			for(i=0; i<14; i++){
				aTitleTspan=oTitleText.append('tspan');
				if(i%3==0) aTitleTspan.attr('dx',10).text(titArr[i/3]);
				if(i%3==2) aTitleTspan.attr('dx',10).text('|')
			}
			//--------------------------------create title-------------------------------------
			
			oSvg.on('mouseover',function(){
				oGTitle.style('display','block')
			}).on('mouseout',function(){
				oGTitle.style('display','none')
			});
			//--------------------------------title events-------------------------------------
		
			iSHeight=parseInt( oSvg.style('height') );
			iSWidth=parseInt( oSvg.style('width') );
			iKBoxHeight=iSHeight*0.6;
			iKBoxWidth=iSWidth;
			
			iDLen=oData.length;	//数据个数
			iKWidth=iKBoxWidth*0.8/iDLen;	//K线宽
			iSpaceWidth=iKBoxWidth*0.2/(iDLen-1);	//间距宽
			
			iMaxData=maxOrMin().max;
			iMinData=maxOrMin().min;
			iScaleData=iMaxData-iMinData;
			
			
			oGKBox=oSvg.append('g').attr({
				'id':'g-kchart-box',
				'transform':'translate(0,30)'
			});
			oGHist=oSvg.append('g').attr({
				'id':'g-hist',
				'transform':'translate(0,'+( iKBoxHeight+50 )+')'
			});
			oGKMask=oSvg.append('g').attr({
				'id':'g-kchart-mask',
				'transform':'translate(0,30)'
			});
			/*
			[1415894400000,"10.88","10.98","10.75","10.91"]
			   时间戳，开盘，最高，最低，收盘
			 time，open，high，low，close
			*/
			iScH=iKBoxHeight/iScaleData;
			for(i=0; i<iDLen; i++){
				var oGK=oGKBox.append('g').attr(
						'transform','translate('+
						precise( (iKWidth+iSpaceWidth)*i )+','+
						precise( (iMaxData-oData[i][2])*iScH )+')'
					),
				
					scale=oData[i][1]-oData[i][4],	//开盘价-收盘价
				
					iKHeight=Math.abs(scale)*iScH,
					oKRect=oGK.append('rect').attr({
						width: precise( iKWidth ),
						height: precise( iKHeight )
					}),
				
					iLineX=precise( iKWidth/2 );
				
				if( scale>0 ){	//阴线，绿色
					addKChart(2,1,4,3,'#33AA11')
					
				}else if(scale<0){	//阳线，红色
					addKChart(2,4,1,3,'#DD2200')
					
				}else{	//白线
					addKChart(2,4,1,3,'#000');
					oKRect.attr('height',1)
				}
				
				oRect=oGKMask.append('rect').attr({
					opacity:0,
					width: iKWidth+iSpaceWidth,
					height: iSHeight,
					x: (iKWidth+iSpaceWidth)*i,
					index:i
				});
				if(i==iDLen-1){
					oRect.attr('width',iKWidth)
				}
			};
			
			function addKChart(maxNum,nextNum,prevNum,minNum,color){
				topLineHeight=precise( (oData[i][maxNum]-oData[i][nextNum])*iScH );
				oGK.append('path').attr({
					d:'M'+iLineX+' 0 '+iLineX+' '+topLineHeight,
					stroke:color
				});	//上影线
				
				bottomLineHeight=(oData[i][prevNum]-oData[i][minNum])*iScH;
				marginTop=iKHeight+topLineHeight;
				oGK.append('path').attr({
					d:'M'+iLineX+' '+precise( marginTop )+' '+iLineX+' '+precise(marginTop+bottomLineHeight),
					stroke:color
				})	//下影线
				
				oKRect.attr({
					fill:color,
					y:topLineHeight
				})
			}
			
			function maxOrMin(){
				maxArr=[];
				minArr=[];
				for(i=0; i<iDLen; i++){
					maxArr.push(oData[i][2]);
					minArr.push(oData[i][3]);
				}
				arr=maxArr.concat(minArr);
				arr.sort(function(a,b){return a-b});
				return {
					max:arr[arr.length-1],
					min:arr[0]
				};
			}
			
			function precise(num){
				//return num.toFixed()-0
				return parseInt( num )
			}
			//-----------------------------create KChart--------------------------------------
			
			function Histogram(){
				var iHistHeight=iSHeight*0.2-35,
					aHistArr=[],
					iMaxHist,oG,oRect,iRectHeight,scale;
				for(i=0; i<iDLen; i++){
					aHistArr.push(oData[i][5]);
				}
				
				iMaxHist=Math.max.apply(null,aHistArr);
				
				for(i=0; i<iDLen; i++){
					iRectHeight=oData[i][5]*iHistHeight/iMaxHist;
					oRect=oGHist.append('rect').attr({
						x: precise( (iKWidth+iSpaceWidth)*i ),
						y: iHistHeight-iRectHeight,
						width: precise( iKWidth ),
						height: iRectHeight
					})
					
					scale=oData[i][1]-oData[i][4];
					if( scale>0 ){	//阴线，绿色
						oRect.attr('fill','#33AA11')
					}else if(scale<0){	//阳线，红色
						oRect.attr('fill','#DD2200')
					}
				}
				
			}Histogram();
			
			//-----------------------------Create a histogram（柱状图）----------------------------
			var oGCross=oSvg.append('g').attr({
				id:'g-cross',
				transform:'translate(0,30)'
			});
			
			var oVP=oGCross.append('path').attr('stroke','#666');
				//oHP=oGCross.append('path').attr('stroke','#666');
			
			d3.select('#g-kchart-mask')[0][0].addEventListener('mouseover',function(e){
				var i=e.target.getAttribute('index'),
					aTspan=d3.selectAll('#text tspan')[0];
				aTspan[1].textContent=transformDate(oData[i][0]);
				aTspan[4].textContent=oData[i][1];
				aTspan[7].textContent=oData[i][2];
				aTspan[10].textContent=oData[i][3];
				aTspan[13].textContent=oData[i][4];
				
				//HD=( (iMaxData-oData[i][1])/iScaleData*iKBoxHeight ).toFixed()-0.5;	//横线
				//var VD=( (iKWidth+iSpaceWidth)*(2*i+1)/2 ).toFixed()-0.5;
				var VD=( (iKWidth+iSpaceWidth)*i+(iKWidth+iSpaceWidth)/2 ).toFixed()-0.5;
				
				//oHP.attr('d','M0 '+HD+'H'+iSWidth);
				oVP.attr('d','M'+VD+' 0V'+iSHeight)
			},false);
			
			d3.select('#g-kchart-mask')[0][0].addEventListener('mouseout',function(){
				oVP.attr('d','')
			},false);
			
			function transformDate(sDate){
				var oDate = new Date( sDate ),
					Y=oDate.getFullYear()+'-',
					M=(oDate.getMonth()+1>10?oDate.getMonth()+1:'0'+(oDate.getMonth()+1))+'-',
					D=( oDate.getDate()>10?oDate.getDate():'0'+oDate.getDate() )+' ',
					h=oDate.getHours()+':',
					m=oDate.getMinutes();
				return Y+M+D+h+m
			}
			
			//创建可点击K线
			function clickEvent(){
				var oG=oSvg.append('g').attr({
						'transform':'translate(0,30)'
					}),
					iScH=iKBoxHeight/iScaleData;
					
				for(i=0; i<iDLen; i++){
					var scale=oData[i][1]-oData[i][4],
						h=Math.abs(scale)*iScH;
					if( scale>0 ){	//阴线，绿色
						h+=addHeight(2,1,4,3);
					}else if(scale<0){	//阳线，红色
						h+=addHeight(2,4,1,3);
					}else{	//白线
						h+=addHeight(2,4,1,3);
					}
					
					var oRect=oG.append('rect').attr(
							'transform','translate('+
							(iKWidth+iSpaceWidth)*i+','+
							( (iMaxData-oData[i][2])*iScH-2 )+')'
					).attr({
						cursor:'pointer',
						width:iKWidth,
						height:h+4,
						opacity:0
					})
					
					oRect.on('click',function(){
						alert(0)
					})
				}
				
				function addHeight(maxNum,nextNum,prevNum,minNum){
					var h=(oData[i][maxNum]-oData[i][nextNum])*iScH;
					h+=(oData[i][prevNum]-oData[i][minNum])*iScH;
					return h
				}
				
			}clickEvent();
			
			//创建气球
			function balloon(){
				var iScH=iKBoxHeight/iScaleData;
				for(i=0; i<iDLen; i++){
					if(oData[i][6]){
						var oG=oSvg.append('g').attr({
							class:'g-icon',
							onOff:'1',
							index:oData[i][6].letter,
							cursor:'pointer',
							'transform':'translate('+
							precise( (iKWidth+iSpaceWidth)*i+iKWidth/2-9 )+','+
							precise( (iMaxData-oData[i][2])*iScH )+')'
						});
						oIcon=oG.append('path').attr({
							d:'M6.7,0C3,0,0,3,0,6.7C0,10.5,6.7,18,6.7,18s6.7-7.5,6.7-11.2C13.5,3,10.5,0,6.7,0z',
							fill:'#DD4B39',
							transform:'scale(1.3)'
						});
						oIconText=oG.append('text').attr({
							x:4.5,
							y:14,
							fill:'#fff'
						}).text(oData[i][6].letter);
						oTitle=oG.append('title').text(oData[i][6].title).attr('index',i);
					}
				}
				
				var oGIcon=d3.selectAll('.g-icon');
				
				oGIcon.on('click',function(){
					var	_this=d3.select(this),
						onOff=_this.attr('onOff')-0;
						
					if(onOff){
						var i=_this.select('title').attr('index');
						showTip({
							x: precise( (iKWidth+iSpaceWidth)*i-3 ),
							y: 100,
							index: _this.attr('index'),
							elem: _this,
							svgBox: oElem,
							time: transformDate(oData[i][0]),
							title: oData[i][6].title,
							content: oData[i][6].content
						})
						_this.attr('onOff',onOff-1)
					}else{
						closeTip(_this.attr('index'));
						_this.attr('onOff',onOff+1)
					}
					
				})
				
			}balloon();
			
			//-----------------------------KChart events--------------------------------------
			
			oSvg.append('line').attr({
				stroke:'#ccc',
				x1:0, y1: iKBoxHeight+40,	//+30是title的高，+10保持距离
				x2: iKBoxWidth, y2: iKBoxHeight+40
			});
			oSvg.append('line').attr({
				stroke:'#ccc',
				x1:0, y1: iSHeight*0.8+25,	//+30是title的高，+20是上个线和空白，+10保持距离
				x2: iKBoxWidth, y2: iSHeight*0.8+25
			});
			//-----------------------------HR--------------------------------------
	}
};
