<?php

header("Pragma: public");
header("Expires: 0"); // set expiration time
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Content-Type: application/force-download");
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition:attachment;filename=export");

echo $_REQUEST['exportContent']; 

?>