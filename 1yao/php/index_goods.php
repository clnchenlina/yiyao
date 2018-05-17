<?php
	require "conn.php";
	
	$query1="select * from ggimg where classify='1'
			 ORDER BY RAND() LIMIT 4;
			";
	$query2="select * from ggimg where classify='2'";
	
	$query3="select * from goods 
			 ORDER BY RAND() LIMIT 5;
			";
	$query3="select * from goods 
			 ORDER BY RAND() LIMIT 5;
			";
	$result1=mysql_query($query1);
	$result2=mysql_query($query2);
	$result3=mysql_query($query3);
	
	
	$array1=array();
	for($i=0;$i<mysql_num_rows($result1);$i++){
		$array1[$i]=mysql_fetch_array($result1,MYSQL_ASSOC);
	}
	$array2=array();
	for($i=0;$i<mysql_num_rows($result2);$i++){
		$array2[$i]=mysql_fetch_array($result2,MYSQL_ASSOC);
	}
	$array3=array();
	for($i=0;$i<mysql_num_rows($result3);$i++){
		$array3[$i]=mysql_fetch_array($result3,MYSQL_ASSOC);
	}
	
	
	
	//php面向对象
	
	class infomation{//创建一个类
	};
	
	
	
	$data=new infomation();//实例化
	
	
	
	$data->info1=$array1;
	$data->info2=$array2;
	$data->info3=$array3;
	
	echo json_encode($data);//实例
?>