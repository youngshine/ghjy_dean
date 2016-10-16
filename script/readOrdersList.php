<?php
/*
 * 8-1 全校的课程销售单（大小班 或 一对一）
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
//$payment = $arr->payment;
$schoolsubID = $arr->schoolsubID;
if($schoolsubID == 0){
	$cond1 = "1 > 0"; //all
}else{
	$cond1 = "a.schoolsubID = $schoolsubID";
}
$kcType = $arr->kcType;
$refund = $arr->refund;
if($refund == '退单'){
	$cond2 = "a.accntType = '退费退班' ";
}else{
	$cond2 = "(a.accntType != '退费退班' And a.accntType Like '%$kcType%'  )";
}
// a.payment Like '%$payment%' 
$sql = " SELECT a.*,b.studentName,c.consultName AS consultName_owe,d.fullname AS schoolsub,
	(SELECT sum(af.amount) From `ghjy_accnt_fee` af 
		WHERE af.accntID=a.accntID ) AS amount_done     
	From `ghjy_accnt` a 
	Join `ghjy_student` b On a.studentId=b.studentID 
	Join `ghjy_consult` c On a.consultID_owe=c.consultID  
	Join `ghjy_school_sub` d On a.schoolsubID=d.schoolsubID 
	WHERE a.schoolID = $schoolID 
		And (a.accntDate >= '$start' And a.accntDate <= '$end') 
		And $cond1 
		And $cond2 ";	 
$result = mysql_query($sql) 
	or die("Invalid query: readAccntList " . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取全校课程销售单成功";
$res->data = $query_array;

echo $_GET['callback']."(".$res->to_json().")";

?>