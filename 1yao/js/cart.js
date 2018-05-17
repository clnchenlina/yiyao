$(function(){
	if (getCookie('cartsid') && getCookie('cartnum')) {
		alert(1)
	    var s = getCookie('cartsid').split(',');//存放sid数组
	    var n = getCookie('cartnum').split(',');//存放数量数组
	    for (var i = 0; i < s.length; i++) {
	        createcart(s[i], n[i]);//遍历创建商品列表
	    }
	}
	function createcart(sid, num) {//sid：图片的编号  num:商品的数量
	    $.ajax({
	        url:'http://127.0.0.1/js/1yao/php/cart.php',
	        dataType:'json'
	    }).done(function(data) {
	    	console.log(data.length)
	        for (var i = 0; i < data.length; i++) {
	            if (sid == data[i].goodsid) {//图片的sid和数据里面的sid匹配
	                var $clone = $('.item-content:hidden').clone(true);//对隐藏的模块进行克隆
	                //都是赋值
	                $clone.find('.td-item .item-pic').find('img').attr('src', data[i].ggimg);
	                $clone.find('.td-item .item-info').find('a').html(data[i].goodsname);
	                $clone.find('.td-price .td-inner').append(data[i].price);
	                $clone.find('.td-amount .item-amount ').find('.text-amount').val(num);
	                //计算价格,每个商品的价格
	                var $dj1 = parseFloat($clone.find('.text-amount').val());//获取单价
	                $clone.find('.td-sum').find('.td-inner').append((num*$dj1).toFixed(2));
	                
	                $clone.css('display', 'block');//克隆的模块是隐藏，显示出来。
	                $('.item-body').append($clone);//追加
	            }
	        }
	    });
	}
	/*
	var $goodsid=getCookie('goodsid');
	var $goodsnum=getCookie('num');
	$.ajax({
		url:'http://127.0.0.1/js/1yao/php/xq.php',
		data:{
			goodsid:$goodsid
		},
		dataType:'json'//数据类型
	}).done(function(d){//成功
		var goods=d;
		let goodslist='';
		$.each(goods.info2, function(i) {
			goodslist+=`1`
		});
		$('.cart-main').find('.item-body').append(goodslist);//
		
		console.log(d);
		
	})*/
	
	
});
