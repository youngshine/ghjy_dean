<?php
/*
  * oop方式 class , + ajax json跨域（不用jsonp)
  * 读取某个学生的某个课程（大小班、一对N）的消耗课时, jsonp 对应 store
*/

require_once('db/database_connection.php');
require_once 'db/response.php';
require_once 'db/request.php';

$req = new Request(array());
$res = new Response();

$arr = $req->params;
$accntdetailID = $arr->accntdetailID;
// 不定参数，用数组？？
//$accntID = $_REQUEST['accntID'];

$course = new Course($accntdetailID);
$data = $course->getList();

$res->success = true;
$res->message = "读取学生课程的消耗课时成功";
$res->data = $data;

echo $_GET['callback']."(".$res->to_json().")";


class Course {
  private $accntdetailID;
  //private $accntID;
  
  //private $query_result; //查询结果集

  public function __construct($studentID) {
	  //$this->accntID = $accntID;
	  $this->accntdetailID = $accntdetailID;
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
	  $query = "SELECT a.hour,a.beginTime As courseDate,a.flag  
		  From `ghjy_one2n_course` a 
	  	  Join `ghjy_one2n_student` b On a.one2nstudentID=b.one2nstudentID  
		  Where b.accntdetailID=$this->accntdetailID";  
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