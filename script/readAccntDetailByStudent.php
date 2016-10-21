<?php
/*
 * 8-1 某个学生的购买课程明细
*/
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$studentID = $arr->studentID;

$sql = " SELECT a.kclistID,a.unitprice,a.hour,a.amount,b.title,c.studentID   
	From `ghjy_accnt_detail` a 
	Join `ghjy_kclist` b On a.kclistID=b.kclistID 
	Join `ghjy_accnt` c On a.accntID=c.accntID 
	WHERE c.studentID = $studentID "; 
$result = mysql_query($sql) 
	or die("Invalid query: readAccntDetail By student " . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取学生报读课程明细成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>