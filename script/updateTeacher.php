<?php
/*log
 *16-08-11 修改教师，userId不要修改
endlog */
// 咨询师
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$teacherID = $arr->teacherID; // update unique
$teacherName = addslashes($arr->teacherName); 
$gender = addslashes($arr->gender); 
$phone = addslashes($arr->phone); 
$note = addslashes($arr->note); 
$subjectID = $arr->subjectID;

$query = "UPDATE `ghjy_teacher` SET 
	teacherName = '$teacherName',gender = '$gender',
	phone = '$phone',note = '$note',subjectID = $subjectID
	WHERE teacherID = $teacherID ";
$result = mysql_query($query) or die("Invalid query: updateTeacher" . mysql_error());
	
if($result){
	$res->success = true;
	$res->message = "修改教师成功";
}else{
	$res->success = false;
	$res->message = "修改教师失败";
}
echo $_GET['callback']."(".$res->to_json().")";

?>
