require.config({ 
	paths:{
		'jquery':'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min',//去掉扩展名。
		'jquerycooike':'jquery.cookie',
	}
});
define(['jquery','jquerycooike'],function(){
	function getUrlParam(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null; 
	}
	return {
		init:function(){
		    var $id = getUrlParam('goodsid');
		    $.ajax({
			    type:'get',
			    url:'http://127.0.0.1/js/1yao/php/xq.php',
			    dataType:'json',
			    data:{
					goodsid:$id
				},
		    }).done(function(d){//成功
					var goodsinfo=d.info1;
					var goodsimg=d.info2;
					console.log(d);
					$('.detailnav').find('.classify').html(goodsinfo[0].classify);
					$('.detailnav').find('.title').html(goodsinfo[0].goodsname);
					$('.middle_property').find('h1').html(goodsinfo[0].goodsname);
					$('.middle_property').find('.giftRed').html(goodsinfo[0].js);
					$('.shangpin_info').find('.good_price').html('¥'+goodsinfo[0].price);
					
					var shangpinimg=`<div><img src="${goodsimg[0].img1}" id="productImg"></img></div>`;
					$('.sideleft').find('.zoomPad').prepend(shangpinimg);
					
					var smallimg=`<li><a><img style="border:1px solid red" src="${goodsimg[0].img1}"/></a></li>`;
					smallimg+=`<li><a><img src="${goodsimg[0].img2}"/></a></li>`;
					smallimg+=`<li><a><img src="${goodsimg[0].img3}"/></a></li>`;
					smallimg+=`<li><a><img src="${goodsimg[0].img4}"/></a></li>`;
					smallimg+=`<li><a><img src="${goodsimg[0].img5}"/></a></li>`;
					$('#thumblist').prepend(smallimg);
					var bigimg=`<img src="${goodsimg[0].img1}"></img>`;
					//$('.zoomWindow').find('.zoomWrapperImage').append(bigimg);
					
			}).fail(function(){//失败
					console.log(1)
			});					
		},
		fdj:function(){
		 	var $bigbox=$('.zoomPad');
		 	var $spic=$('.zoomPad');
		 	var $sf=$('.zoomPup');
		 	var $bf=$('.zoomWindow');
		 	var $left=$('.imgpreview');
		 	var $right=$('.imgnext');
		 	var $bpic=$('.zoomWrapperImage img');
		 	$bigbox.on('mouseenter','div',function(){
		 		$sf.show().css('width',$spic.width()*$bf.width()/$bpic.width()).css('height',$spic.height()*$bf.height()/$bpic.height());
		 		$bf.find('img').attr('src',$(this).find('img').attr('src'));
		 		$bf.show();
		 		
		 		var scale = $bf.find('img').width()/$spic.width();
		        $(this).on('mousemove',function(ev){
		            var x = ev.pageX-$bigbox.offset().left-$sf.width() / 2;
		            var y = ev.pageY-$bigbox.offset().top-$sf.height() / 2;
		            
		            if (x < 0) {
		                x = 0;
		            } else if (x >= $spic.width() - $sf.width() - 1) {
		                x = $spic.width() - $sf.width() - 1;
		            }
		            if (y < 0) {
		                y = 0;
		            } else if (y >= $spic.height() - $sf.height() - 2) {
		                y = $spic.height() - $sf.height() - 2;
		            }
		           	$sf.css({
		           		left:x,
		           		top:y
		           	})
		           	$bpic.css({
		           		left:-x*scale,
		           		top:-y*scale
		           	})
		          
		        })
		         $(this).on('mouseleave',function(){
		        	$sf.hide();
	    			$bf.hide();
		        })

		 	});
		 	
		 	$('#thumblist').on('click','li',function(){
		 		$(this).find('img').css('borderColor','red');
		 		$(this).siblings('li').find('img').css('borderColor','#e6e6e6');
		 		$bigbox.find('img').attr('src',$(this).find('img').attr('src'));
		 	});
	      
			
		},
		num:function(){
			var $cut=$('.num_section').find('.num_pre');
			var $add=$('.num_section').find('.num_next');
			$add.on('click',function(){
				$(this).siblings('.num').val(Number($(this).siblings('input').val())+1)
			});
			$cut.on('click',function(){
				if($(this).siblings('.num').val()!=0){
					$(this).siblings('.num').val(Number($(this).siblings('input').val())-1)
				}else{
					$(this).siblings('.num').val('0');
				}
				
			});
		},
		addcart:function(){
			var sidarr = [];
			var numarr = [];
			function getcookievalue(){
				if(getCookie('cartsid')){//cartsid：cookie里面id的名称
					sidarr=getCookie('cartsid').split(',');
				}
				
				if(getCookie('cartnum')){//cartnum：cookie里面数量的名称
					numarr=getCookie('cartnum').split(',');
				}
			}
			
		    var $id = getUrlParam('goodsid');
		    var $num = $('#product_amount').val();
		    
		    $('#seriesCartButton').on('click',function(){
		    	var sid=getUrlParam('goodsid');
		    	getcookievalue();//获取商品的id和数量,放到对应的数组中,利用数组进行匹配
				if ($.inArray(sid, sidarr) != -1) {//是否存在cookie中
					//将之前的数据和当前存的数据相加，存放cookie里面
					if(getCookie('cartnum')==''){
						var num=parseInt($('#product_amount').val());
						numarr[$.inArray(sid,sidarr)]=num;
						addCookie('cartnum', numarr.toString(), 7);//修改后的结果
						sidarr[$.inArray(sid,sidarr)]=sid;//将当前id添加到对应的位置。
	    				addCookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
					}else{
						var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($('#product_amount').val());
						numarr[$.inArray(sid,sidarr)]=num;
						addCookie('cartnum', numarr.toString(), 7);//修改后的结果
					}
				}else{//不存在
					sidarr.push(sid);//将当前id添加到数组里面。
	    			addCookie('cartsid', sidarr.toString(), 7);//将整个数组添加到cookie
	    			numarr.push($('#product_amount').val());//存放输入的数量，默认是1
	    			addCookie('cartnum', numarr.toString(), 7);
				}
		    	alert('加入购物车成功！');
		    });
		}
		
	}
	

});