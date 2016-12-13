<?php
/*
 * 添加咨询师
*/
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$userId = addslashes($_REQUEST['userId']); 
$consultName = addslashes($_REQUEST['consultName']); // user统一
$gender = $_REQUEST['gender'];
$phone = addslashes($_REQUEST['phone']);
$schoolID = $_REQUEST['schoolID']; //归属学校
$schoolsubID = $_REQUEST['schoolsubID']; // 学校下面分校

$sql = "INSERT INTO `ghjy_consult` 
	(consultName,gender,phone,userId,schoolID,schoolsubID) 
	VALUES('$consultName','$gender','$phone','$userId',
		$schoolID,$schoolsubID)";
$result = mysql_query($sql) Or die("Invalid query: createConsult" . mysql_error());

if($result){
	$id = mysql_insert_id(); 	
	echo json_encode(array(
        "success" => true,
        "message" => "创建咨询师成功",
		"data"    => array("consultID" => $id)
    ));
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "创建失败",
    ));
}

?>
