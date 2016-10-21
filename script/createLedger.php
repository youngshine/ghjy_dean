<?php
/*
 * 财务记账
*/
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$ledgerType = addslashes($_REQUEST['ledgerType']); 
$ledgerItem = addslashes($_REQUEST['ledgerItem']);  
$ledgerDate = $_REQUEST['ledgerDate'];
$amt_in = $_REQUEST['amt_in']; 
$amt_out = $_REQUEST['amt_out'];
$note = addslashes($_REQUEST['note']); 
$schoolID = $_REQUEST['schoolID'];

$query = "INSERT INTO `ghjy_ledger` 
	(ledgerDate,ledgerType,ledgerItem,amt_in,amt_out,note,schoolID) 
	VALUES
	('$ledgerDate','$ledgerType','$ledgerItem',$amt_in,$amt_out,'$note',$schoolID)";
$result = mysql_query($query);

if($result){
	$id = mysql_insert_id(); 	
	echo json_encode(array(
        "success" => true,
        "message" => "创建记账成功",
		"data"    => array("ledgerID" => $id)
    ));
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "创建记账失败",
		"data"    => mysql_error()
    ));
}

?>
