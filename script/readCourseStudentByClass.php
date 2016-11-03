<?php
// 读取大小班上课课时的学生考勤明细 
// DATA_FORMAT(datetime,format) to 日期
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$courseNo = addslashes( $arr->courseNo );

$sql = " SELECT a.*,b.studentName     
	From `ghjy_class_course` a 
	Join `ghjy_student` b On a.studentID=b.studentID 
	Where a.courseNo = '$courseNo' ";
$result = mysql_query($sql) 
	or die("Invalid query: readClasscourseAttendee By beginDate" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}

$res->success = true;
$res->message = "读取班级点名出勤成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>