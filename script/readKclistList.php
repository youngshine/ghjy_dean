<?php

// 学校课程
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$schoolID = $arr->schoolID;
$query = " SELECT a.*,b.subjectName,c.gradeName 
	From `ghjy_kclist` a 
	Left Join `ghjy_subject` b On a.subjectID=b.subjectID 
	Left Join `ghjy_grade` c On a.gradeID=c.gradeID 
	Where a.schoolID=$schoolID 
	Order by a.created Desc ";

$result = mysql_query($query) 
	or die("Invalid query: readKclist by school" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取全校课程kclist成功";
$res->data = $query_array;


echo $_GET['callback']."(".$res->to_json().")";
?>