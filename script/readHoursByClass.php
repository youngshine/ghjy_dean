<?php
// 学生班级课时消耗，点名一次2课时
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
$query = "SELECT count(a.courseNo)*2 As hour,b.kclistID,c.title As kcTitle  
	From `ghjy_class_course` a 
	Join `ghjy_class` b On a.classID=b.classID 
	Join `ghjy_kclist` c On b.kclistID=c.kclistID 
	Where a.studentID=$studentID 
	Group By a.classID ";	
			
$result = mysql_query($query) or 
	die("Invalid query: readCStudentHours By class" . mysql_error());

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