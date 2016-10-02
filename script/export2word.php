<?php

header("Content-type: text/html; charset=utf-8"); 
//date_default_timezone_set("Asia/Shanghai");

class word{ 
	function start()
	{
		ob_start();
		echo '<html xmlns:o="urn:schemas-microsoft-com:office:office"
		xmlns:w="urn:schemas-microsoft-com:office:word"
		xmlns="http://www.w3.org/TR/REC-html40">';
	}
	
	function save($path)
	{
		echo "</html>";
		$data = ob_get_contents();
		ob_end_clean();
 
		$this->wirtefile ($path,$data);
	}
 
	function wirtefile ($fn,$data)
	{
		$fp=fopen($fn,"wb");
		fwrite($fp,$data);
		fclose($fp);
	}
}

$title = '<table width=600 cellpadding="6" cellspacing="1">
	<tr><td colspan=2 style="text-align:center;font-size:1.8em;">检测报告</td></tr>
	<tr><td>委托编号：</td><td style="text-align:right;">共2页 第1页</td></tr>
	</table>';
for($i=0;$i<1;$i++){
	$title = $title . '<hr>';
}	
	
$html = $title . ' 
<table width=600 cellpadding="6" cellspacing="1" bgcolor="#336699"> 
<tr bgcolor="White"> 
  <td colspan=1>样品名称Sample</td> 
  <td>牛仔裤</td>
  <td>检验类别</td>
  <td>委托检验</td>
</tr> 
<tr bgcolor="White"> 
  <td style="text-align:right;">委托单位wt</td> 
  <td colspan=3>七匹狼服装股份有限公司</td>
</tr> 
<tr bgcolor="White"> 
  <td style="text-align:right;">地址</td> 
  <td colspan=3>泉州晋江金井</td>
</tr> 
<tr bgcolor="White"> 
  <td colspan=1>生产单位名称</td> 
  <td>－－</td>
  <td>商标</td>
  <td>SWop</td>
</tr> 
<tr bgcolor="White"> 
  <td colspan=1>安全技术类别</td> 
  <td>B类</td>
  <td>等级</td>
  <td>合格品</td>
</tr> 
<tr bgcolor="White"> 
  <td colspan=1>样品状态</td> 
  <td>正常</td>
  <td>样品数量</td>
  <td>1件</td>
</tr> 
<tr bgcolor="White"> 
  <td rowspan=2>规格型号</td> 
  <td rowspan=2>162430602303</td>
  <td>接样日期</td>
  <td>2014-4-4</td>
</tr> 
<tr bgcolor="White"> 
  <td>测试日期</td>
  <td>2014-4-18</td>
</tr> 
<tr bgcolor="White"> 
  <td>检测项目及检测结果</td>
  <td colspan=3>检测项目：耐皂洗色牢度、耐汗渍色牢度、耐水渍色牢度、耐摩擦色牢度、纤维含量、甲醛含量、
          pH值、可分解芳香胺染料。
检测结果：见第2页至第3页
  </td>
</tr> 
<tr bgcolor="White"> 
  <td>检测依据</td>
  <td colspan=3>GB 18401-2010《国家纺织产品基本安全技术规范》B类
FZ/T 73020-2012《针织休闲服装》合格品
  </td>
</tr> 
<tr bgcolor="White"> 
  <td rowspan=2>检测结论</td> 
  <td colspan=3>样品经检验，所检项目符合GB 18401-2010 《国家纺织产品基本安全技术规范》标准B类安</td>
</tr> 
<tr bgcolor="White"> 
  <td> </td>
  <td colspan=2>签发日期 ：2014年04月16日</td> 
</tr> 
<tr bgcolor="White"> 
  <td>报告说明</td>
  <td colspan=3>1.	有关检测数据未经本检测机构或有关行政主管部门允许，任何单位不得擅自向社会发布信息。
2.	本实验室根据客户要求完成以上检测内容，检测结果只对来样负责。
3.	本报告中检测项目均在相应的标准规定的环境条件下进行（有注明的除外）。
4.	按客户要求，色牢度测试深色部位。

  </td>
</tr> 

<tr bgcolor="red"> 
  <td>PHP10086</td> 
  <td><a href="http://www.php10086.com" target="_blank" >http://www.php10086.com</a></td> 
</tr> 
<tr bgcolor="White"> 
  <td colspan=2 > 
  PHP10086<br> 
  最靠谱的PHP技术博客分享网站 
  <img src="http://www.php10086.com/wp-content/themes/WPortal-Blue/images/logo.gif"> 
  </td> 
</tr> 
</table> 
'; 
 
//批量生成 
for($i=1;$i<=1;$i++){ 
    $word = new word(); 
    $word->start(); 
    //$html = "aaa".$i; 
    $wordname = '检测报告'.$i.".doc"; 
    echo $html; 
    $word->save($wordname); 
    ob_flush();//每次执行前刷新缓存 
    flush(); 
}