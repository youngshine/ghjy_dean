// 教师一对多课程学生出勤及其评价（一对多才有评价？）
Ext.define('Youngshine.view.teacher.CourseAssess' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.accnt-detail',
	//id: 'winPrepaidHist',

	autoShow: true,
	closable: true,
	modal: true,
	//collapsible: true,
	//resizable: false,
	width: 650,
	height: 400,
	layout: 'fit',

    title : '课时出勤学生及其评价',
	//titleAlign: 'center',
	
	record: null, // 父表参数传递，该学生信息

	fbar: [{	
		xtype: 'button',
		text: '关闭',
		//scale: 'medium',
		width: 55,
		style: {
			//background: 'transparent',
			border: 1 //'1px solid #fff'
		},
		handler: function(btn){
			btn.up('window').close()
		}
	}],
	
	items: [{
		xtype: 'grid',
		stripeRows: true,
		allowDeselect: true,
		//selType: 'cellmodel',
		store: 'CourseAssess',
	    columns: [{
			xtype: 'rownumberer',
	     }, {
	         text: '学生',
	         width: 80,
			 menuDisabled: true,
	         dataIndex: 'studentName'
	     }, {
	         text: '出勤',
	         width: 50,
			 menuDisabled: true,
	         dataIndex: 'flag',
			 align: 'center',
			 renderer: function(value){
		         if (value == 0) {
		             return '旷课';
		         }
				 var flag = (value == 1) ? '✔' : (value == 2 ? '✔迟到': '旷课' ) 
		         return flag;
		     }	 
	     }, {
	         text: '一对N家长评价',
	         flex: 1,
			 menuDisabled: true,
	         dataIndex: 'assessTag_list'
	     }, {
	         text: '评价备注',
	         width: 150,
			 menuDisabled: true,
	         dataIndex: 'assessNote',	 			 
	    }],     
	}],

	// 大小班，一对N消耗课时
	onCourse: function(record){
		var obj = {
			"accntdetailID": record.get('accntdetailID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readOne2nCourse.php', 
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
                if(result.success){
					console.log(result.data)
					var arr = result.data,
						title = ''
					for(var i=0;i<arr.length;i++)
						title += (i+1) + '、' + arr[i].courseDate + '：' + 
							arr[i].hour+'课时，'+ arr[i].flag + '<br>';
					Ext.MessageBox.alert('课程消耗',title)
                }
            },
        });
	},
	
});