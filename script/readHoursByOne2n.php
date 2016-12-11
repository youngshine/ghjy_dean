<?php
// 学生一对多课时消耗，
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$studentID = $arr->studentID;
//$start = $arr->start;
//$end = $arr->end;
//$schoolID = $arr->schoolID;

// 大小班，一次课等于2个小时 2 As hour，按班级日期算，不是按个人
$query = "SELECT sum(a.hour) As hour,b.title As kcTitle  
	From `ghjy_one2n_course` a 
	Join `ghjy_kclist` b On a.kclistID=b.kclistID 
	Where a.studentID=$studentID 
	Group By a.kclistID ";	
			
$result = mysql_query($query) or 
	die("Invalid query: readCStudentHours By one2n" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取大小班课时消耗成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>