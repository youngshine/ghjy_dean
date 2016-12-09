<?php
/*log
 *16-08-11 咨询师设定为主管、分校校长
endlog */
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

require_once('db/database_connection.php');

$consultID = $_REQUEST['consultID']; // update unique

$query = "UPDATE `ghjy_consult` SET isChief = 1 
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
