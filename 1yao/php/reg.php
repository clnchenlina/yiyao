<?php
	require "conn.php";
	//确认前端是否将用户名传输过来。
	//如果手机号存在，或者点击了submit按钮
	if(isset($_POST['phone']) || isset($_POST['submit'])){
		$userphone=@$_POST['phone'];//@:容错
	}else{
		exit('非法操作');//输出文字，退出程序
	}
	
	//判断用户输入的手机号是否存在数据库中,引号。
	$query1="select * from users where phone='$userphone'";
	
	$result=mysql_query($query1);//如果$result有结果，代表手机号存在数据库中
	
	if(mysql_fetch_array($result)){//有重复
		echo true;//1
	}else{
		echo false;//空
	}
	
	//注册的信息放置到数据库里面
	if(isset($_POST['submit'])){
		$userphone=$_POST['phone'];//手机号
		$pass=md5($_POST['password']);//密码
		$query="insert users values(null,'$pass','$userphone')";
		mysql_query($query);
		header('location:../login.html');
	}

?>