$(function(){
	$('.tab_box .item').on('click',function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	})
	$('.tab_box').find('.item:first').on('click',function(){
		$('#commonLogin').show().next('div').hide();
	});
	$('.tab_box').find('.item:last').on('click',function(){
		$('#quickLogin').show().prev('div').hide();
	});
	
	$('.moreWebDiv').on('mouseover',function(){
		$(this).find('.moreTab').show();
		$('.login_wrap').css('padding-bottom','50px');
	}).on('mouseout',function(){
		$(this).find('.moreTab').hide();
		$('.login_wrap').css('padding-bottom','0');
		
	});
	var bstop=false;
	var phonereg=/^1[3|4|6|7|8]\d{9}$/;
	$('#username').on('blur',function(){
		var username=$(this).val();//获取手机号
		if(username!=''){//检测手机号是否为空
			if(phonereg.test(username)){//检测手机号是否满足正则
				$(this).css('border-color','#e6e6e6')
				bstop=true;
				
			}else{
				$(this).css('border','#e72418 1px solid').nextAll('span.error').show().css('color','#e72418').html('手机号格式不正确');
				bstop=false;
			}
		}else{
			$(this).css('border','#ffaa00 1px solid').nextAll('.i_empty').show();
			bstop=false;
		}
	});
	$('#username').on('focus',function(){
		$(this).nextAll().css('display','none');
	});
	$('#userPass').on('blur',function(){
		var userpass=$(this).val();//获取密码
		if(userpass!=''){//检测密码是否为空
			$(this).css('border-color','#e6e6e6')
			bstop=true;
		}else{
			$(this).css('border','red 1px solid').nextAll('span.error').show().css('color','#e72418').html('请输入密码');
			bstop=false;
		}
	});
	$('#vcd').on('blur',function(){
		if($(this).val()!=$('.verifyimg').html()){
			$(this).next('i').removeClass('i_true');
			$(this).css('border','red 1px solid').next('i').addClass('i_false').nextAll('span.error').show().css('color','#e72418').html('验证码不正确');
			bstop=false;
		}
		else{
			$(this).css('border','#e6e6e6 1px solid').next('i').removeClass('i_false');
			$(this).next('i').addClass('i_true').nextAll('span.error').hide();
			bstop=true;
		}
		
	});
	$('.verifyimg').html(yzm()).on('click',function(){
		$('.verifyimg').html(yzm());
	});
	$('.verify_box .verifylink').on('click',function(){
		$('.verifyimg').html(yzm());
	});
	$('#btnSubmit').on('click',function(){
		$.ajax({
			url:'http://127.0.0.1/js/1yao/php/login.php',
		}).done(function(d){
			if(d){
				
			}else{
				alert('用户名或密码错误');
			}
			
		}).fail(function(){
			alert(Error);
		})
	})
	$('form').on('submit',function(){//验证不通过无法提交的
		if(!bstop){
			alert('请填写正确信息');
			return false;//阻止按钮跳转。
		}
	});
	function yzm () {
		var arr=[];
		var str='';
		for(let i=48;i<58;i++){
			arr.push(String.fromCharCode(i));
		}
		for(let i=97;i<123;i++){
			arr.push(String.fromCharCode(i));
		}
		for(let i=0;i<4;i++){
			let randnum=parseInt(Math.random()*35);
			if(randnum>9){
				if(Math.random()>0.5){
					str+=arr[randnum].toUpperCase();
				}else
					str+=arr[randnum].toLowerCase();
			}
			else 
				str+=arr[randnum];
		}
		return str;
	}
});
