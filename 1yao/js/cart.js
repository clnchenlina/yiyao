$(function(){
	var sidarr = [];
	var numarr = [];
	check('.cart-main #checkall');//上面的全选
	check('.cartOperation #checkall');//下面的全选（两个全选不在同一个父级里）
	totalprice ();
	checkedtotalprice();
	kong ();
	if (getCookie('cartsid') && getCookie('cartnum')) {//检测cookie，存在添加到购物车
	    var s = getCookie('cartsid').split(',');//存放cartsid数组
	    var n = getCookie('cartnum').split(',');//存放数量数组
	    $.each(s,function(i){
	    	createcart(s[i], n[i]);
	    })
	    totalprice ();
	    checkedtotalprice();
	}
	//点击按钮数量减一，并保存到cookie
	$('.td-amount').find('.btn-reduce').on('click',function(){
		if($(this).next().val()!=1){
			$(this).next().val((Number($(this).next().val())-1));
		}else{
			alert('最小值为1');
			$(this).next().val(1);
		}
		let $dj=$(this).parents('.item-content').find('.td-price').find('span').html();//获取单价
		let $num=$(this).next().val();//获取数量
		$(this).parents('.item-content').find('.td-sum .td-inner').find('span').html(($dj*$num).toFixed(2));//单个商品的总价
		let goodsid=$(this).parents('.item-content').find('.item-pic img').attr('id');//获取该商品的id
		getcookievalue();//获取cookie
		numarr[sidarr.indexOf(goodsid)]=$(this).next().val();//改变cookie中该商品的数量
		addCookie('cartsid', sidarr.toString(), 7);//改变cookie中该商品的数量
		addCookie('cartnum', numarr.toString(), 7);//改变cookie中该商品的数量
		totalprice ();
		checkedtotalprice();
	});
	//点击按钮数量加一，并保存到cookie
	$('.td-amount').find('.btn-plus').on('click',function(){
		$(this).prev().val((Number($(this).prev().val())+1));
		let $dj=$(this).parents('.item-content').find('.td-price').find('span').html();//获取单价
		let $num=$(this).prev().val();//获取数量
		$(this).parents('.item-content').find('.td-sum .td-inner').find('span').html(($dj*$num).toFixed(2));//单个商品的总价
		let goodsid=$(this).parents('.item-content').find('.item-pic img').attr('id');//获取该商品的id
		getcookievalue();//获取cookie
		numarr[sidarr.indexOf(goodsid)]=$(this).prev().val();//改变cookie中该商品的数量
		addCookie('cartsid', sidarr.toString(), 7);//改变cookie中该商品的数量
		addCookie('cartnum', numarr.toString(), 7);//改变cookie中该商品的数量
		totalprice ();
		checkedtotalprice();
	});
	
	$('.deleteButton').on('click',function(){//删除对应商品
		if(confirm('你确定要删除吗？')){
			$(this).parents('.item-content').remove();
			del($(this));
	    }
		
	});
	
	$('.cartOperation').find('.operations a').on('click',function(){//删除选中的商品
		if(confirm('你确定要删除吗？')){
	   		$('.item-content:visible').each(function(){
	   			if($(this).find('input:checkbox').is(':checked')){
	   				var $clearall =$(this).find('.deleteButton');
					$(this).remove();
					del($clearall);
	   			}
			});
	    }
		alert('删除成功');
	});
	
	$('.cartOperation').find('.clearitem a').on('click',function(){//清空购物车
		if(confirm('你确定要删除吗？')){
	   		$('.item-content:visible').each(function(){
				var $clearall =$(this).find('.deleteButton');
				$(this).remove();
				del($clearall);
			});
	    }
		alert('删除成功');
	});
	
	function createcart(sid, num) {//sid：商品编号  num:商品的数量，添加商品
	    $.ajax({
	        url:'http://127.0.0.1/js/1yao/php/cart.php',
	        dataType:'json'
	    }).done(function(data) {
	    	$.each(data, function(i) {
	    		if (sid == data[i].goodsid) {//sid和数据里面goodsid匹配
	                var $clone = $('.item-content:hidden').clone(true);//对隐藏的模块进行克隆
	                //拼接
	                $clone.find('.td-item .item-pic').find('img').attr('src', data[i].ggimg).attr('id',data[i].goodsid);
	                $clone.find('.td-item .item-info').find('a').html(data[i].goodsname);
	                $clone.find('.td-price .td-inner').append(`<span>${data[i].price}</span>`);
	                $clone.find('.td-amount .item-amount ').find('.text-amount').val(num);
	                $clone.find('.td-sum').find('.td-inner').append(`<span>${(num*data[i].price).toFixed(2)}</span>`);
	                $clone.css('display', 'block');//克隆的模块是隐藏，显示出来。
	                $('.item-body').append($clone);//追加
	                totalprice ();
	                checkedtotalprice();
	            }
	    	});
	    });
	}
	function getcookievalue(){//获取cookie的值，转成数组
		if(getCookie('cartsid')){//cartsid：cookie里面id的名称
			sidarr=getCookie('cartsid').split(',');
		}
		
		if(getCookie('cartnum')){//cartnum：cookie里面数量的名称
			numarr=getCookie('cartnum').split(',');
		}
	}
	
	function check(obj){//全选
		$(obj).on('change',function(){//全选按钮
			$('.item-content:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
			$('.cart-main').find('#checkall').prop('checked', $(this).prop('checked'));
			checkedtotalprice ();
		});
		var $inputs=$('.item-content:visible').find('input:checkbox');
		$('.item-body').on('change',$inputs,function(){
			if($('.item-content:visible').find('input:checkbox').length==$('.item-content:visible').find('input:checked').size()){
				$('.cart-main').find('#checkall').prop('checked',true);
				$('.cartOperation').find('#checkall').prop('checked',true);
			}else{
				$('.cart-main').find('#checkall').prop('checked',false);
				$('.cartOperation').find('#checkall').prop('checked',false);
			}
			checkedtotalprice ();
		});
	}
	
	function del(obj){//删除单个商品
		let goodsid=obj.parents('.item-content').find('.td-item img').attr('id');//获取当前商品的id
		getcookievalue();//获取cookie
		sidarr.splice(sidarr.indexOf(goodsid), 1)//删除数组中该商品的id
		numarr.splice(sidarr.indexOf(goodsid), 1)//删除数组中该商品的数量
		addCookie('cartsid', sidarr.toString(), 7);//覆盖原来的id数组
		addCookie('cartnum', numarr.toString(), 7);//覆盖原来的num数组
		totalprice();
		checkedtotalprice();
		kong();
	}
	function totalprice () {
		var total=0;
		$('.item-content:visible').each(function(){
			total += parseFloat($(this).find('.td-sum span').html());
		});
		$('.dianzongji .zj').html('¥'+total.toFixed(2));
	}
	function checkedtotalprice () {
		var total=0;
		$('.item-content:visible').each(function(){
			if($(this).find('input:checkbox').is(':checked')){
				total += parseFloat($(this).find('.td-sum span').html());
			}
		});
		$('.pay_bar .total_item span').html(total.toFixed(2));
	}
	function kong () {
		if (getCookie('cartsid')) {
			$('.cart-main').show();
			$('.float_bar').show();
	        $('.empty_box').hide();
	    } else {
	    	$('.cart-main').hide();
			$('.float_bar').hide();
	        $('.empty_box').show();
	    }
	}
});
