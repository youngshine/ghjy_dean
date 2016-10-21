<?php
/*
  * oop方式 class , + ajax json跨域（不用jsonp)
  * 读取某个学生的缴费记录, jsonp 对应 store
*/

require_once('db/database_connection.php');
require_once 'db/response.php';
require_once 'db/request.php';

$req = new Request(array());
$res = new Response();

$arr = $req->params;
$studentID = $arr->studentID;
// 不定参数，用数组？？
//$accntID = $_REQUEST['accntID'];

$accntfee = new AccntFee($studentID);
$data = $accntfee->getList();

$res->success = true;
$res->message = "读取学生缴费记录fee成功";
$res->data = $data;

echo $_GET['callback']."(".$res->to_json().")";


class AccntFee {
  private $studentID;
  //private $accntID;
  
  //private $query_result; //查询结果集

  public function __construct($studentID) {
	  //$this->accntID = $accntID;
	  $this->studentID = $studentID;
	  //$this->accntID = 3;
  }
	
  public function getList() {	  
	  // require_once('db_cfg.php');
/*	  
	  $ip = '10.66.153.50:3306';
	  $user = 'root';
	  $psw = 'rootroot2@';
	  $conn = mysql_connect($ip,$user,$psw);
	  
	  if (!$conn) die('Could not connect: ' . mysql_error());

	  mysql_select_db("ghjy", $conn);	 
*/	  
	  //var_dump($this->accntID); 
	  $query = "SELECT a.*,b.studentID 
		  From `ghjy_accnt_fee` a 
	  	  Join `ghjy_accnt` b On a.accntID=b.accntID 
		  Where b.studentID=$this->studentID";  
	  $result = mysql_query($query);

	  mysql_close($conn); 
	  //$this->query_result = mysql_fetch_array($result); //单个记录
	  
		$query_array = array();
		$i = 0;
		//Iterate all Select
		while($row = mysql_fetch_array($result))
		{
			array_push($query_array,$row);
			$i++;
		}
		
		//$this->query_result = $query_array;  
	  return $query_array;
  }
}
	
?>