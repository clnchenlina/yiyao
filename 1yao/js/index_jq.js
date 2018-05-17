require.config({ 
	baseUrl:'http://apps.bdimg.com/libs/',//共有的路径
	paths:{
		'jquery':'jquery/2.1.4/jquery.min',//去掉扩展名。
	}
});
define(['jquery'],function(){//第三方框架直接引用
	return {
		init:function(){
			/*--safe_warm--*/
			$('.safe_warm .close_ico').on('click',function(){
				$('.safe_warm').css('display','none');
			});	
			/*--address--*/
			$('.hd_provinceList li').children('a').on('click',function(){
				$('.province_name').html($(this).html());
			});
			/*--word--*/
			$('#word').on('focus',function(){
				if(!$(this).val() || $(this).val()=='请输入商品名、症状、人群等'){
					$(this).val('').next().css('display','block');
				}
				
			});
			$('#word').on('blur',function(){
				if(!$(this).val()){
					$word=$(this).next().html();
					$(this).val($word).next().css('display','none');
				}
				
			});
			$('#word').on('input',function(){
				$(this).next().css('display','none');
			});
			
			
			$('.consult_tt').on('click',function(){
				$(this).addClass('tabMenu_cur');
				$(this).siblings().removeClass('tabMenu_cur');
			});
			$('.consult1').on('click',function(){
				$('.consult_text1').css('display','block');
				$('.consult_text2').css('display','none');
			});
			$('.consult2').on('click',function(){
				$('.consult_text2').css('display','block');
				$('.consult_text1').css('display','none');
			});
			
			
			$('.server_tt').find('ul').find('li').on('click',function(){
				$('.tab_con').addClass('hide');
				$(this).siblings().removeClass('on');
				$(this).addClass('on');
			});
			$('.server_tt').find('ul').find('.service').on('click',function(){
				$('.service_div').removeClass('hide');
				$('.news_div').addClass('hide');
			});
			$('.server_tt').find('ul').find('.news').on('click',function(){
				$('.service_div').addClass('hide');
				$('.news_div').removeClass('hide');
			});
			
			$('.service_div a').on('mouseover',function(){
				$(this).find('.service_ico').animate({
					marginTop: 10
				},200).animate({
					marginTop: 5
				},200)
			});
			
			
			$('.fri_tit').find('li').on('mouseover',function(){
			    $(this).addClass('cur').siblings().removeClass('cur');
			});
			$('.fri_tit1').on('mouseover',function(){
				$('.flagship_store').show().siblings('div').hide();
			});
			$('.fri_tit2').on('mouseover',function(){
				$('.friendly').show().siblings('div').hide();
			});
			
			
		},
		nav:function(){
			/*--classify--*/
			
			
			$('.sortbox').on('mouseover','li',function(){
				$(this).addClass('stitleactive');
				var $a=$(this).find('h4').html();
				$.ajax({
					url:'http://127.0.0.1/js/1yao/php/index_nav.php',
					dataType:'json',//数据类型
				}).done(function(d){//成功
					var twoclassifyname=d.info2;
					var sanclassifyname=d.info3;
					console.log(d);
					let twoclassify=`<div class="category"><div class="mode-bd"><dl>
					<dt>${twoclassifyname[0].classifyname}</dt><dd>`
					$.each(sanclassifyname,function(i){
						twoclassify+=`<em><a>
										${sanclassifyname[i].classifyname3}
										</a></em>`;
					
					})
					
					twoclassify+=`</dd></dl></div></div>`;
					$('.stitle').append(twoclassify);
						
				}).fail(function(){//失败
						console.log(1)
				});					
			});
			$('.sortbox').on('mouseout','li',function(){
				$(this).removeClass('stitleactive');
				if($(this).find('.category').css('display')=='none'){
					$(this).find('.category').remove();
				}
			});
		},
		lunbo:function(){
			var $banner = $('.tsSlide');//大盒子
		    var $img = $('.imgbox a');//移动的图片
		    var $btn = $('.y_slide_a');//按钮
		    var $prev = $('.tsSlide .y_slide_prev');//左箭头
		    var $next = $('.tsSlide .y_slide_next');//右箭头
		    var $qindex = 0; //前一个索引
		    var $index = 0; //当前索引
		    var timer=null//定时器
			//1.给按钮添加事件
			$btn.on('click',function(ev){
			   	$index=$(this).index();//当前点击的索引
			   	tabswitch(ev);
			   	$qindex=$index;//将当前的索引给前一个索引
			 });
			 clearInterval(timer);
			 
			 //2.显示左右箭头
			 $banner.hover(function(){
			 	clearInterval(timer);
			 	$prev.show();
			 	$next.show();
			 },function(){
			 	timer=setInterval(function(){
					$next.trigger('click');
				},3000);
			 	$prev.hide();
			 	$next.hide();
			 });
			 $prev.on('mouseover',function(){
			 	clearInterval(timer);
			 });
			 $next.on('mouseover',function(){
			 	clearInterval(timer);
			 });
			 //3.给左右箭头添加事件
			 $next.on('click',function(ev){
			 	$index++;
			 	if($index>5){
			 		$index=0;
			 		$qindex=5;
			 	}
			 	tabswitch(ev);
			 	$qindex=$index;//将当前的索引给前一个索引
			 });
			 
			 $prev.on('click',function(ev){
			 	$index--;
			 	if($index<0){
			 		$index=5;
			 		$qindex=0;
			 	}
			 	tabswitch(ev);
			 	$qindex=$index;//将当前的索引给前一个索引
			 });
			 
			 //4.定时器
			 timer=setInterval(function(){
					$next.trigger('click');
				},3000);
			 
			 function tabswitch(ev){
			 	$btn.eq($index).addClass('y_slide_on').siblings('span').removeClass('y_slide_on');
			 	if($index==0 && $qindex==5){
			 		if(ev.target.nodeName=='SPAN'){
			 			$img.eq($qindex).animate({
					   		left:750
					   	});
					   	$img.eq($index).css('left','-750px').animate({
					   		left:0
					   	})
			 		}else{
			 			$img.eq($qindex).animate({
					   		left:-750
					   	});
					   	$img.eq($index).css('left','750px').animate({
					   		left:0
					   	})
			 		}
			 		
			 	}else if($index==5 && $qindex==0){
			 		if(ev.target.nodeName=='SPAN'){
			 			$img.eq($qindex).animate({
					   		left:-750
					   	});
					   	$img.eq($index).css('left','750px').animate({
					   		left:0
					   	})
			 		}else{
			 			$img.eq($qindex).animate({
					   		left:750
					   	});
					   	$img.eq($index).css('left','-750px').animate({
					   		left:0
					   	})
			 		}
			 		
			 	}else if($index>$qindex){//当前点击的索引大于前一个索引
			 		$img.eq($qindex).animate({
				   		left:-750
				   	});
				   	
				   	$img.eq($index).css('left','750px').animate({
				   		left:0
				   	})
			 	}else if($qindex>$index){
			 		$img.eq($qindex).animate({
				   		left:750
				   	});
				   	$img.eq($index).css('left','-750px').animate({
				   		left:0
				   	})
			 	}
			 }
			
		},
		goods:function(){
			$.ajax({
				url:'http://127.0.0.1/js/1yao/php/index_goods.php',
				dataType:'json',//数据类型
			}).done(function(d){//成功
				var goods=d;
				
				let ggimg='';
				$.each(goods.info1, function(i) {
					ggimg+=`<a href="xq.html?goodsid=${goods.info1[i].ggimggoods}"><img src="${goods.info1[i].ggimg}"></img></a>`
				});
				$('.specialAds').append(ggimg);//
				
				let ggimg2='';
				$.each(goods.info2, function(i) {
					ggimg2+=`<a href="xq.html?goodsid=${goods.info2[i].ggimggoods}"><img src="${goods.info2[i].ggimg}"></img></a>`
				});
				$('.sale .sale_ads').append(ggimg2);
				$('.sale .sale_ads a:last-child').children().addClass('last');
				
				let ggimg3='';
				$.each(goods.info3, function(i) {
					ggimg3+=`<li>
								<a href="xq.html?goodsid=${goods.info3[i].goodsid}">
									<img src="${goods.info3[i].ggimg}"></img>
								</a>
								<a href="xq.html?goodsid=${goods.info3[i].goodsid}">${goods.info3[i].goodsname}</a>
								<p>
									<i>¥</i>${goods.info3[i].price}
								</p>
							</li>`
				});
				$('.sp_show').append(ggimg3);
				$('.sp_show:last-child').children().addClass('last');
				
				console.log(d);
				
			}).fail(function(){//失败
				console.log(1)
			});
			
		},
		smalllunbo:function(lunnum){
			var $lunnum=$(lunnum)
			var $img = $lunnum.find('.sale_slider a')//移动的图片
		    var $btn = $lunnum.find('.sale_slider .y_slide_a');//按钮
		    var $qindex = 0; //前一个索引
		    var $index = 0; //当前索引
			//1.给按钮添加事件
			$btn.on('click',function(ev){
			   	$index=$(this).index();//当前点击的索引
			   	tabswitch(ev);
			   	$qindex=$index;//将当前的索引给前一个索引
			 });
			 
			 function tabswitch(ev){
			 	$btn.eq($index).addClass('y_slide_on').siblings('span').removeClass('y_slide_on');
			 	if($index==0 && $qindex==2){
			 		if(ev.target.nodeName=='SPAN'){
			 			$img.eq($qindex).animate({
					   		left:605
					   	});
					   	$img.eq($index).css('left','-605px').animate({
					   		left:0
					   	})
			 		}else{
			 			$img.eq($qindex).animate({
					   		left:-605
					   	});
					   	$img.eq($index).css('left','605px').animate({
					   		left:0
					   	})
			 		}
			 		
			 	}else if($index==2 && $qindex==0){
			 		if(ev.target.nodeName=='SPAN'){
			 			$img.eq($qindex).animate({
					   		left:-605
					   	});
					   	$img.eq($index).css('left','605px').animate({
					   		left:0
					   	})
			 		}else{
			 			$img.eq($qindex).animate({
					   		left:605
					   	});
					   	$img.eq($index).css('left','-605px').animate({
					   		left:0
					   	})
			 		}
			 		
			 	}else if($index>$qindex){//当前点击的索引大于前一个索引
			 		$img.eq($qindex).animate({
				   		left:-605
				   	});
				   	
				   	$img.eq($index).css('left','605px').animate({
				   		left:0
				   	})
			 	}else if($qindex>$index){
			 		$img.eq($qindex).animate({
				   		left:605
				   	});
				   	$img.eq($index).css('left','-605px').animate({
				   		left:0
				   	})
			 	}
			 }
			
		},
			
		    
		
		louti:function(){
			var $louti=$('#elevator_n');
    		var $loutili=$('#elevator_n ul li');
    		var $louceng=$('.index_floor');
    		$(window).on('scroll',function(){
    			var $st=$(window).scrollTop();
    			if($st>=935){
    				$louti.show();
    			}else{
    				$louti.hide();
    			}
    			$louceng.each(function(index,element){
    				var $top1=$louceng.eq(index).offset().top+400;
    				if($top1>$st){
    					$loutili.removeClass('hover');
    					$loutili.eq(index).addClass('hover');
    					return false;
    				}
    			});
    			
    		});
    		
    		$loutili.on('click',function(){
    			var $top=$louceng.eq($(this).index()).offset().top;
    			$('html,body').animate({
    				scrollTop:$top
    			})
    		});
    		$loutili.on('mouseover',function(){
    			$(this).addClass('hover').siblings().removeClass('hover');
    		});
		},
		backtotop:function(){
			var $btop=$('.float_box .f_top');
			$btop.on('click',function(){
				$('html,body').animate({
    				scrollTop:0
    			});
			})
			
		}
	}
});