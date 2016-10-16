<?php
/*
 * 8-1 全校的缴款记录
 8 consultID_owe 归属咨询师，不是录入consultID
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
$payment = $arr->payment;
$schoolsubID = $arr->schoolsubID;
if($schoolsubID == 0){
	$cond1 = "1 > 0"; //all
}else{
	$cond1 = "a.schoolsubID = $schoolsubID";
}
$kcType = $arr->kcType;
$refund = $arr->refund;
if($refund == '退单'){
	$cond2 = "b.accntType = '退费退班' ";
}else{
	$cond2 = "(b.accntType != '退费退班' And b.accntType Like '%$kcType%'  )";
}
// a.payment Like '%$payment%' 
$sql = " SELECT a.*,b.accntType,
	c.studentName,d.fullname AS schoolsub,e.consultName As consultName_owe    
	From `ghjy_accnt_fee` a 
	Join `ghjy_accnt` b On a.accntID=b.accntID 
	Join `ghjy_student` c On b.studentId=c.studentID 
	Join `ghjy_school_sub` d On b.schoolsubID=d.schoolsubID 
	Join `ghjy_consult` e On b.consultID_owe=e.consultID  
	WHERE b.schoolID = $schoolID 
		And (a.feeDate >= '$start' And a.feeDate <= '$end') 
		And a.payment Like '%$payment%' 
		And $cond1 
		And $cond2 ";	 
$result = mysql_query($sql) 
	or die("Invalid query: readAccntFeeList " . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取全校缴款记录成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>