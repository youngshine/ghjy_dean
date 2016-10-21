<?php
/* 
 * 删除收支记账 ajax instead of jsonp 9/22
 */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$ledgerID = $_REQUEST['ledgerID'];	
	
$query = "DELETE from `ghjy_ledger` Where ledgerID = $ledgerID ";
$result = mysql_query($query) 
	or die("Invalid query: deleteLedger" . mysql_error());

echo json_encode(array(
    "success" => true,
    "message" => "删除收支记账成功"
));


?>
