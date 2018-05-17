<?php
	require "conn.php";
	
	if(isset($_POST['login'])){//前端ajax传输过来的额
		$username=$_POST['phone'];//获取用户名
		$password=md5($_POST['pass']);//获取密码
	}else{
		exit('非法操作');
	}
	
	//匹配用户名和密码是否同时相等
	$query="select * from users where phone='$username' and password='$password'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo true;
		header('location:../index.html');
	}else{
		echo false;
		//header('location:../login.html');
	}

?>




	
	
