<?php
/*log
 *16-08-11 修改咨询师，userId不要修改
endlog */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$consultID = $_REQUEST['consultID']; // update unique
$consultName = addslashes($_REQUEST['consultName']); 
$gender = addslashes($_REQUEST['gender']); 
$phone = addslashes($_REQUEST['phone']); 
$note = addslashes($_REQUEST['note']); 
$schoolsubID = $_REQUEST['schoolsubID'];

$query = "UPDATE `ghjy_consult` SET 
	consultName = '$consultName',gender = '$gender',
	phone = '$phone',note = '$note',
	schoolsubID = $schoolsubID
	WHERE consultID = $consultID ";
$result = mysql_query($query);
	
if($result){
	echo json_encode(array(
        "success" => true,
        "message" => "修改咨询师成功",
    ));
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "修改失败",
    ));
}

?>
