<?php  


header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *'); // 跨域问题
//header('Access-Control-Allow-Headers: X-Requested-With');

$arrList = $_REQUEST['arrList']; //销售记录 addslash
//$arrList =  file_get_contents("php://input");
//$arrList = '[{"name":"lin","age":48},{"name":"wang","age":37}]';
$arrList = json_decode($arrList); //json字符串转换成数组 decode($a,true)
//$i = count($arrList); //行数


 
// 导入PHPExcel类库  
require_once("Classes/PHPExcel.php");  
  
// 通常PHPExcel对象有两种实例化的方式  
// 1. 通过new关键字创建空白文档  
$phpexcel = new PHPExcel();  
  
// 2. 通过读取已有的模板创建  
//$phpexcel = PHPExcel_IOFactory::createReader("Excel5")->load("template.xls");  
  
/**  
 * 实例化之后的PHPExcel对象类似于一个暂存于内存中文档文件，  
 * 可以对它进行操作以达到修改文档数据的目的 
 */  
// 设置文档属性  
$phpexcel->getProperties()->setCreator("Young Lin") // 文档作者  
                          ->setLastModifiedBy("Young Lin") // 最后一次修改者  
                          ->setTitle("报读缴费明细") // 标题  
                          ->setSubject("根号教育服务平台") // 主题  
                          ->setDescription("Test document for Office 2003 XLS, generated using PHPExcel.") // 备注  
                          ->setKeywords("office 2003 openxml php") // 关键字  
                          ->setCategory("Test result file"); // 类别  
                            
// 默认状态下，新创建的空白文档（通过new）只有一个工作表（sheet），且它的编号（index）为0  
// 可以通过如下的方式添加新的工作表  
$phpexcel->createSheet(1);  
  
// 获取已有编号的工作表  
$sheet = $phpexcel->getSheet(1);  
  
// 设置当前激活的工作表编号  
$phpexcel->setActiveSheetIndex(1);  
  
// 获取当前激活的工作表  
$sheet = $phpexcel->getActiveSheet();  
  
// 得到工作表之后就可以操作它的单元格以修改数据了  
// 修改工作表的名称  
$sheet->setTitle("报读缴费明细");  
  
// 设置单元格A5的值  
//$sheet->setCellValue("A5", date('Y-m-d h:i:s'));  
  
// 1、设置第3行第5列（E3）的值  
$sheet->setCellValueByColumnAndRow(1, 1, '报读缴费记录');  
$sheet->setCellValueByColumnAndRow(1, 3, '日期'); 
$sheet->setCellValueByColumnAndRow(2, 3, '类型'); 
$sheet->setCellValueByColumnAndRow(3, 3, '金额'); 
$sheet->setCellValueByColumnAndRow(4, 3, '归属咨询师'); 
$sheet->setCellValueByColumnAndRow(5, 3, '分校区'); 
$sheet->setCellValueByColumnAndRow(6, 3, '备注'); 

// 2 循环填充表格
$i = 0;
foreach($arrList as $rec){
	$sheet->setCellValueByColumnAndRow(1, $i+4, $rec->accntDate); 
	$sheet->setCellValueByColumnAndRow(2, $i+4, $rec->accntType); 
	$sheet->setCellValueByColumnAndRow(3, $i+4, $rec->amount); 
	$sheet->setCellValueByColumnAndRow(4, $i+4, $rec->consultName_owe); 
	$sheet->setCellValueByColumnAndRow(5, $i+4, $rec->schoolsub); 
	$sheet->setCellValueByColumnAndRow(6, $i+4, $rec->note); 
	$i++;
}

/* 循环
for ($i=0; $i<count($arrList); $i++) {
	//for ($j=0; $j<count($title); $j++) {
	  $sheet->setCellValueByColumnAndRow(j+1, i+3, 255);  
	//}
} */
  
// 在本地保存文档  
PHPExcel_IOFactory::createWriter($phpexcel, 'Excel5')->save("output.xls");  
  
// 输出文档到页面  
/*
header('Content-Type: application/vnd.ms-excel');  
header('Content-Disposition: attachment;filename="test.xls"');  
header('Cache-Control: max-age=0');  
PHPExcel_IOFactory::createWriter($phpexcel, 'Excel5')->save('php://output');  
*/

echo json_encode(array(
    "success" => true,
    "message" => "导出Excel成功",
	"data"    => $arrList
));

?>  