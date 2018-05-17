<?php
	require "conn.php";
	
	$goods=mysql_query("select * from goods");
	
		
	$array=array();
	for($i=0;$i<mysql_num_rows($goods);$i++){
		$array[$i]=mysql_fetch_array($goods,MYSQL_ASSOC);
	}
	echo json_encode($array);
?>