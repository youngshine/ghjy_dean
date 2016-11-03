<?php
// 读取一对N上课课时的学生考勤明细 
// DATA_FORMAT(datetime,format) to 日期
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$courseNo = $arr->courseNo;

// 一对一不存在考勤flag，所以flag =1
$sql = " SELECT a.*,b.studentName       
	From `ghjy_one2n_course` a 
	Join `ghjy_student` b On a.studentID=b.studentID 
	Where a.courseNo = '$courseNo' ";
$result = mysql_query($sql) 
	or die("Invalid query: readCourseStudent By one2n" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}

$res->success = true;
$res->message = "读取一对N点名出勤成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

	
?>