<?php

// 年级表，包括幼儿园
require_once 'db/response.php';
require_once 'db/request.php';
require_once('db/database_connection.php');

$req = new Request(array());
$res = new Response();

$query = " SELECT * From `ghjy_grade` ";

$result = mysql_query($query) Or die("Invalid query: readGradeList" . mysql_error());

$query_array = array();
$i = 0;
//Iterate all Select
while($row = mysql_fetch_array($result))
{
	array_push($query_array,$row);
	$i++;
}
	
$res->success = true;
$res->message = "读取年级grade成功";
$res->data = $query_array;


echo $_GET['callback']."(".$res->to_json().")";

?>