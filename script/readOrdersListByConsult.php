<?php
/*
 * 8-1 咨询业绩（大小班 或 一对一，退费）归属consult_owe
 * consultID_owe，而不是录入的consultID
*/
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$arr = $req->params;

$consultID_owe = $arr->consultID_owe;
$schoolID = $arr->schoolID;
$start = $arr->start;
$end = $arr->end;
//$payment = $arr->payment;
$kcType = $arr->kcType;
$refund = $arr->refund;
if($refund == '退单'){
	$cond2 = "a.accntType = '退费退班' ";
}else{
	$cond2 = "(a.accntType != '退费退班' And a.accntType Like '%$kcType%'  )";
}

$sql = " SELECT a.*,b.studentName,c.consultName AS consultName_owe,d.fullname AS schoolsub,
	(SELECT sum(af.amount) From `ghjy_accnt_fee` af 
		WHERE af.accntID=a.accntID ) AS amount_done   
	From `ghjy_accnt` a 
	Join `ghjy_student` b On a.studentId=b.studentID 
	Join `ghjy_consult` c On a.consultID_owe=c.consultID  
	Join `ghjy_school_sub` d On a.schoolsubID=d.schoolsubID 
	WHERE a.schoolID = $schoolID 
		And a.consultID_owe = $consultID_owe  
		And (a.accntDate >= '$start' And a.accntDate <= '$end') 
		And $cond2 ";	 
$result = mysql_query($sql) 
	or die("Invalid query: readAccntList by consult_owe" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取咨询师归属业绩consult_owe成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>