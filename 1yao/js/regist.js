$(function(){
	var bstop=false;//不通过
	var phonereg=/^1[3|4|6|7|8]\d{9}$/;
	$('#phone').on('blur',function(){
		var userphone=$(this).val();//获取手机号
		if(userphone!=''){//检测手机号是否为空
			if(phonereg.test(userphone)){//检测手机号是否满足正则
				//将当前的手机号给后端，后端和数据库进行匹配，不管是否存在，后端返回结果
				$.ajax({
					type:'post',
					url:'http://127.0.0.1/js/1yao/php/reg.php',
					data:{
						phone:userphone//获取手机号给后端
					}
				}).done(function(d){
					if(d){
						$('#phone').css('border-color','red').nextAll('span').css('display','block').addClass('error').html('用户名已存在');
						bstop=false;
					}else{
						$('#phone').css('border-color','#e6e6e6').nextAll('.i_true').css('display','block');
						bstop=true;
					}
					
				}).fail(function(){
					alert(Error);
				})
			}else{
				$(this).css('border','#e72418 1px solid').nextAll('span.error').css('display','block').css('color','#e72418');
				bstop=false;
			}
		}else{
			$(this).css('border','#ffaa00 1px solid').nextAll('.i_empty').css('display','block');
			bstop=false;
		}
	});
	$('#phone').on('focus',function(){
		$(this).nextAll().css('display','none');
	})
	var pwdreg=/^\w{6,20}$/;
	$('#password').on('blur',function(){
		$('.box_pas_safety').hide();
		$(this).nextAll('#password_tip').css('display','none');
		var userpwd=$(this).val();//获取密码
		if(userpwd!=''){//检测密码是否为空
			if(pwdreg.test(userpwd)){//检测密码是否满足正则
				$(this).css('borderColor','#e6e6e6');
				$('#password').nextAll('.i_true').css('display','block');
				$('.psheight').find('input').removeAttr('disabled').css('cursor','text').css('backgroundColor','transparent');
				bstop=true;
			}else{
				$(this).css('border','#e72418 1px solid').nextAll('.error').html('密码只能为6-20位字符').css('display','block');
				bstop=false;
			}
		}else{
			$(this).css('border','#e72418 1px solid').nextAll('.error').html('密码不能为空').css('display','block');
			bstop=false;
		}
	});
	$('#password').on('focus',function(){
		if(!$('#phone').val()){
			$('#phone').css('border','#ffaa00 1px solid').nextAll('.i_empty').css('display','block');
			bstop=false;
		}
		$('.box_pas_safety').show();
		$(this).nextAll().css('display','none').nextAll('#password_tip').css('display','block');
	});
	$('#password').on('input',function(){
		$('#password_tip').hide();
		$('.box_pas_safety').show();
		yzmm($('#password').val());
	});
	$('#password2').on('blur',function(){
		if($('#password').val()!=$(this).val()){
			$('#password2_error').show().html('两次密码不一致');
			$(this).css('borderColor','red');
			$(this).find('.i_true').hide();
		}else{
			$(this).css('borderColor','#e6e6e6').nextAll('.i_true').show();
			$('#password2_error').hide();
		}
		
	});
	$('#xyCheckBox').on('click',function(){
		if(!$('#xyCheckBox').prop('checked')){
			$('#xyCheckBox_desc').show();
			bstop=false;
		}else{
			$('#xyCheckBox_desc').hide();
			bstop=true;
		};
		
	});
	
	$('form').on('submit',function(){//验证不通过无法提交的
		if(!bstop){
			alert('请填写正确信息');
			return false;//阻止按钮跳转。
		}
	});
	function yzmm(mm){
		var reg=/\d+/g;
		var reg1=/[a-zA-Z]+/g;
		var reg2=/\W+/g;
		var count=0;
		if(reg.test(mm)){
			count++;
		}
		if(reg1.test(mm)){
			count++;
		}
		if(reg2.test(mm)){
			count++;
		}
		switch (count){
			case 1: $('.box_pas_safety').find('ul').css('backgroundPosition','0 0');
				break;
			case 2: $('.box_pas_safety').find('ul').css('backgroundPosition','0 -15px');
				break;
			case 3: $('.box_pas_safety').find('ul').css('backgroundPosition','0 -30px');
				break;
		}
	}
});
