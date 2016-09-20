<?php 
/*
 * 登录：学校校长，账号＝学校名称（不是分校）
*/
	require_once('db/request.php');
	require_once('db/response.php');
	require_once('db/database_connection.php');
	//require_once ('../lib/global_function.php');

	$req = new Request(array());
	$res = new Response();

	$arr = $req->params;
	
	//$username = addslashes($arr->username);
	$psw = addslashes($arr->psw);
	$school = addslashes($arr->school);
	
	$query = "SELECT schoolID,schoolName From `ghjy_school` 
		Where psw='$psw' And schoolName='$school' LIMIT 1 ";
	$result = mysql_query($query);

	if(mysql_num_rows($result)>0){
		$row = mysql_fetch_assoc($result); 
		$res->success = true;
		$res->message = '校长登录成功';
		//$res->total = 1;
		$res->data = $row;
	}else{
		//ErrorOutput(10002,'账号或密码错误');
		$res->success = false;
    	$res->message = "登录信息错误";
		$res->data = array();
	}


//CorrectOutput($res);
//echo $_GET['callback'].'('.$res->to_json().')';
//$res->data = array();
echo $_GET['callback']."(".$res->to_json().")";

?>