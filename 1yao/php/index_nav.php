<?php
	require "conn.php";
	
	$query1="select classifyname from classify";
	$query2="
			select twoclassify.classifyname from classify
			right join twoclassify
			on classify.classifyid=twoclassify.oneclassifyid 
	       	";
	$query3="
			select twoclassify.classifyname,sanclassify.classifyname3 from sanclassify
			join twoclassify
			on twoclassify.classifyid=sanclassify.twoclassifyid 
			LIMIT 6;
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
		//属性和方法：共有的属性，私有的，受保护的
		/*public $name='zhangsan';
		private $sex='女';
		protected $age=100;
		
		public function fn(){
			return $this->name;
		}*/
	};
	
	
	
	$data=new infomation();//实例化
	
	//echo $data->name;//zhangsan  获取属性(成员的值)；
	
	
	$data->info1=$array1;
	$data->info2=$array2;
	$data->info3=$array3;
	
	echo json_encode($data);//实例
?>