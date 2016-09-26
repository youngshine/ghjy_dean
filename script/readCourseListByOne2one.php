<?php
// 读取一对一教师授课的课时表course
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

	$query = "SELECT a.*,b.studentID,c.studentName,d.zsdName AS title, '一对一' As kcType       
		From `ghjy_teacher_course` a 
		JOIN `ghjy_student-study` b On a.studentstudyID=b.studentstudyID 
		JOIN `ghjy_student` c On b.studentID=c.studentID 
		JOIN `ghjy_zsd` d On (b.zsdID=d.zsdID And b.subjectID=d.subjectID) 
		Where b.teacherID = $teacherID 
			And ( DATE_FORMAT(a.beginTime,'%Y-%m-%d') >= '$start' And DATE_FORMAT(a.beginTime,'%Y-%m-%d') <= '$end') ";
			
    $result = mysql_query($query) or 
		die("Invalid query: readCourseList By 1to1" . mysql_error());

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