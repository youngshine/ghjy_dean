<?php
// 读取大小班上课课时的学生考勤明细 
// DATA_FORMAT(datetime,format) to 日期
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

// 课时，按照日期分组。一个班级一天不会上2次？？
//$beginDate = $_REQUEST['beginDate'];
//$teacherID = $_REQUEST['teacherID'];
//$classTitle = addslashes($_REQUEST['title']);
$courseNo = addslashes($_REQUEST['courseNo']);

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

echo json_encode(array(
	"success" => true,
	"message" => "读取班级点名出勤成功",
	"data"	  => $query_array
));

?>