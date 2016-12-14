<?php
/* 
 * 删除咨询，有学生student或业绩归属的accnt
 */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$consultID = $_REQUEST['consultID'];	

$sql = "SELECT 1 FROM `ghjy_student` Where consultID = $consultID";
$result = mysql_query($sql);
if(mysql_num_rows($result) > 0){
    echo json_encode(array(
        "success" => false,
        "message" => "有学生归属，不能删除"
    ));
}else{	
	$sql = "SELECT 1 FROM `ghjy_accnt` Where consultID_owe = $consultID";
	$result = mysql_query($sql);
	if(mysql_num_rows($result) > 0){
	    echo json_encode(array(
	        "success" => false,
	        "message" => "有销售业绩归属，不能删除"
	    ));
	}else{
	
		$query = "DELETE FROM `ghjy_consult` Where consultID = $consultID ";
		$result = mysql_query($query) 
			or die("Invalid query: deleteConsult" . mysql_error());

		echo json_encode(array(
	        "success" => true,
	        "message" => "删除咨询师成功" //企业号通讯录如何处理？禁用
	    ));
	}	
}	

?>
