<?php
/*
 * 8-1 全校的报读缴费主记录（大小班 或 一对一）
*/
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

	$req = new Request(array());
	$res = new Response();

	$arr = $req->params;

	$schoolID = $arr->schoolID;

	$sql = " SELECT a.*,b.studentName,c.consultName,d.fullname AS schoolsub    
		From `ghjy_accnt` a 
		Join `ghjy_student` b On a.studentId=b.studentID 
		Join `ghjy_consult` c On a.consultID=c.consultID  
		Join `ghjy_school_sub` d On a.schoolsubID=d.schoolsubID 
		WHERE a.schoolID = $schoolID ";	 
    $result = mysql_query($sql) 
		or die("Invalid query: readAccntList " . mysql_error());

	$query_array = array();
	$i = 0;
	//Iterate all Select
	while($row = mysql_fetch_array($result))
	{
		array_push($query_array,$row);
		$i++;
	}
		
	$res->success = true;
	$res->message = "读取全校缴费成功";
	$res->data = $query_array;

	echo $_GET['callback']."(".$res->to_json().")";
?>