<?php
/*
 * 校长新增课程（kcType:大小班、一对一unitprice）
*/
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$title = addslashes($_REQUEST['title']); 
$kcType = addslashes($_REQUEST['kcType']);  
//$kmType = addslashes($_REQUEST['kmType']); 
//$sectionName = addslashes($_REQUEST['sectionName']); 
$subjectID = $_REQUEST['subjectID']; 
$gradeID = $_REQUEST['gradeID']; 
$unitprice = $_REQUEST['unitprice']; //大小班=0，一对一才有
$hour = $_REQUEST['hour'];
$amount = $_REQUEST['amount'];
//$note = addslashes($_REQUEST['note']); 
$schoolID = $_REQUEST['schoolID'];

$query = "INSERT INTO `ghjy_kclist` 
	(kcType,title,subjectID,gradeID,unitprice,hour,amount,schoolID) 
	VALUES
	('$kcType','$title',$subjectID,$gradeID,$unitprice,$hour,$amount,$schoolID)";
$result = mysql_query($query);

if($result){
	$id = mysql_insert_id(); 	
	echo json_encode(array(
        "success" => true,
        "message" => "创建课程成功",
		"data"    => array("kclistID" => $id)
    ));
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "创建课程失败",
		"data"    => mysql_error()
    ));
}

?>
