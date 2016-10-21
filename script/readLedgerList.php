<?php
/*
 * 日常收支记账
*/
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$schoolID = $arr->schoolID;
$start = $arr->start;
$end = $arr->end;
$ledgerType = $arr->ledgerType;
$ledgerItem = $arr->ledgerItem;

// a.payment Like '%$payment%' 
$sql = " SELECT * From `ghjy_ledger` 
	WHERE schoolID = $schoolID 
		And (ledgerDate >= '$start' And ledgerDate <= '$end') 
		And ledgerType Like '%$ledgerType%' 
		And ledgerItem Like '%$ledgerItem%' 
	Order By created Desc ";	 
$result = mysql_query($sql) 
	or die("Invalid query: readLedgerList " . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取日常收支记账成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>