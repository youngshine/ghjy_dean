<?php
/* 
 * 删除课程，已经有班级的class或有缴费accntdetail，不能删除
 */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$kclistID = $_REQUEST['kclistID'];	

$sql = "SELECT 1 FROM `ghjy_accnt_detail` Where kclistID = $kclistID";
$result = mysql_query($sql);
if(mysql_num_rows($result) > 0){
    echo json_encode(array(
        "success" => false,
        "message" => "课程已经发生缴费，不能删除"
    ));
}else{	
	$sql = "SELECT 1 FROM `ghjy_class` Where kclistID = $kclistID";
	$result = mysql_query($sql);
	if(mysql_num_rows($result) > 0){
	    echo json_encode(array(
	        "success" => false,
	        "message" => "课程已经有隶属班级，不能删除"
	    ));
	}else{
	
		$query = "DELETE FROM `ghjy_kclist` Where kclistID = $kclistID ";
		$result = mysql_query($query) 
			or die("Invalid query: deleteKclist" . mysql_error());

		echo json_encode(array(
	        "success" => true,
	        "message" => "删除课程成功"
	    ));
	}	
}	

?>
