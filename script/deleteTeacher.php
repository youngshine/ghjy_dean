<?php
/* 
 * 删除教师，有班级class或一对多one2n_student不能删除
 */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$teacherID = $_REQUEST['teacherID'];	

$sql = "SELECT 1 FROM `ghjy_class` Where teacherID = $teacherID";
$result = mysql_query($sql);
if(mysql_num_rows($result) > 0){
    echo json_encode(array(
        "success" => false,
        "message" => "有任课大小班级，不能删除"
    ));
}else{	
	$sql = "SELECT 1 FROM `ghjy_one2n_student` Where teacherID = $teacherID";
	$result = mysql_query($sql);
	if(mysql_num_rows($result) > 0){
	    echo json_encode(array(
	        "success" => false,
	        "message" => "有一对多学生，不能删除"
	    ));
	}else{
	
		$query = "DELETE FROM `ghjy_teacher` Where teacherID = $teacherID ";
		$result = mysql_query($query) 
			or die("Invalid query: deleteTeacher" . mysql_error());

		echo json_encode(array(
	        "success" => true,
	        "message" => "删除教师成功" //企业号通讯录如何处理？禁用
	    ));
	}	
}	

?>
