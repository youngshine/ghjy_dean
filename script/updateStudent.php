

<?php
/*log
*16-03-09 修改学生资料，update电话号码重复？？
endlog */
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

    $arr = $req->params;
	
	$studentName = $is_magic_gpc ? $arr->studentName : addslashes($arr->studentName);
	$gender = ($arr->gender);
	$born = ($arr->born);
	$phone = addslashes($arr->phone);
	$addr = $is_magic_gpc ? $arr->addr : addslashes($arr->addr);
	$grade = ($arr->grade);
	// 学生的学校，不是加盟校区
	$school = $is_magic_gpc ? $arr->school : addslashes($arr->school);
	$level_list = ($arr->level_list);	
	$studentID = $arr->studentID;

	$query = "update `ghjy_student` 
		set studentName = '$studentName',gender = '$gender',born = '$born',
		phone = '$phone',addr = '$addr',
		grade = '$grade',school = '$school',level_list = '$level_list'  
		where studentID = $studentID ";
	//$result = mysql_query($query) or die("Invalid query: updateStudent " . mysql_error());
	$result = mysql_query($query);
	if($result){
		$res->success = true;
		$res->message = "修改学生资料student成功";
		//$res->data = array();
	}else{
		$res->success = false;
		$res->message = "电话号码出现重复";
	}
	
echo $_GET['callback']."(".$res->to_json().")";
?>
