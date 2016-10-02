<?php
// 读取大小班教师授课的课时表course, group by courseNo
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$teacherID = $arr->teacherID;
$start = $arr->start;
$end = $arr->end;
$schoolID = $arr->schoolID;

	// 大小班，一次课等于2个小时 2 As hour，按班级日期算，不是按个人
/*	$query = "SELECT a.*, 2 AS hour,beginTime AS created,b.title,'大小班' As kcType       
		From `ghjy_class_course` a 
		JOIN `ghjy_class` b On a.classID=b.classID 
		Where b.teacherID = $teacherID 
			And (DATE_FORMAT(a.beginTime,'%Y-%m-%d') >= '$start' And DATE_FORMAT(a.beginTime,'%Y-%m-%d') <= '$end') 
		Group By a.classID,DATE_FORMAT(beginTime,'%Y-%m-%d') 
		Order By a.classID,DATE_FORMAT(beginTime,'%Y-%m-%d')  ";
*/
$query = "SELECT a.*, 2 AS hour,beginTime AS created,b.title,'大小班' As kcType       
	From `ghjy_class_course` a 
	JOIN `ghjy_class` b On a.classID=b.classID 
	Where b.teacherID = $teacherID 
		And (DATE_FORMAT(a.beginTime,'%Y-%m-%d') >= '$start' And DATE_FORMAT(a.beginTime,'%Y-%m-%d') <= '$end') 
	Group By a.courseNo Order By a.courseNo  ";		
			
$result = mysql_query($query) or 
	die("Invalid query: readCourseList By class" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取大小班课时表course成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>