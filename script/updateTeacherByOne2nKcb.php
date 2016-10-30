<?php
/*log
 *16-08-11 设定教师的一对一上课时间，预先设定
endlog */
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$teacherID = $arr->teacherID; // update unique
$timely_list_one2n = addslashes($arr->timely_list_one2n); 

$query = "UPDATE `ghjy_teacher` 
	SET timely_list_one2n = '$timely_list_one2n' 
	WHERE teacherID = $teacherID ";
$result = mysql_query($query) or die("Invalid query: updateTeacher" . mysql_error());
	
if($result){
	$res->success = true;
	$res->message = "设定一对N上课时间成功";
}else{
	$res->success = false;
	$res->message = "设定一对一上课时间失败";
}
echo $_GET['callback']."(".$res->to_json().")";

?>
