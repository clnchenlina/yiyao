<?php
	require "conn.php";
	
	$goodsid=$_GET['goodsid'];
	
	$query1="select * from goods where goodsid='$goodsid'";
	$query2="select img1,img2,img3,img4,img5,img6 from goodsimg where goodsid='$goodsid'";
	
	$result1=mysql_query($query1);
	$result2=mysql_query($query2);
	
	$array1=array();
	for($i=0;$i<mysql_num_rows($result1);$i++){
		$array1[$i]=mysql_fetch_array($result1,MYSQL_ASSOC);
	}
	$array2=array();
	for($i=0;$i<mysql_num_rows($result2);$i++){
		$array2[$i]=mysql_fetch_array($result2,MYSQL_ASSOC);
	}
	
	class infomation{//创建一个类
	};
	
	
	
	$data=new infomation();//实例化
	
	
	
	$data->info1=$array1;
	$data->info2=$array2;
	
	echo json_encode($data);//实例
	
?>