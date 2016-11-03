<?php
// 读取一对多教师授课的课时表one2n_course group by courseNo
// 新题目库，知识点分3个表，在数据库后端合并成zsd，索引subjectID+zsdID唯一
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

$query = "SELECT a.*,b.title As kcTitle, '一对N' As kcType       
	From `ghjy_one2n_course` a 
	JOIN `ghjy_kclist` b On a.kclistID=b.kclistID  
	Where a.teacherID = $teacherID 
		And ( DATE_FORMAT(a.beginTime,'%Y-%m-%d') >= '$start' And DATE_FORMAT(a.beginTime,'%Y-%m-%d') <= '$end' ) 
	Group By a.courseNo 
	Order By a.courseNo ";
		
$result = mysql_query($query) or 
	die("Invalid query: readCourseList By one2n" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取一对一课时表course成功";
$res->data = $query_array;


echo $_GET['callback']."(".$res->to_json().")";
?>