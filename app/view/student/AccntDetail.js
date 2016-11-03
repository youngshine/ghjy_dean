// 学生的购买课程明细记录
Ext.define('Youngshine.view.student.AccntDetail' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.accnt-detail',
	//id: 'winPrepaidHist',

	autoShow: true,
	closable: true,
	modal: true,
	//collapsible: true,
	//resizable: false,
	width: 500,
	height: 350,
	layout: 'fit',

    title : '课程列表',
	//titleAlign: 'center',
	
	record: null, // 父表参数传递，该学生信息

	fbar: [{
		xtype: 'label',
		html: '合计(元)：',
	},{	
		xtype: 'displayfield',
		itemId: 'subtotal',
		//padding: '0 0 0 5'	
	},'->',{	
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
		store: 'AccntDetail',
	    columns: [{
			xtype: 'rownumberer',
	     }, {
	         text: '课程',
	         flex: 1,
			 menuDisabled: true,
	         dataIndex: 'title'
	     }, {
	         text: '类型',
	         width: 60,
			 menuDisabled: true,
	         dataIndex: 'kcType',
	     }, {
	         text: '单价',
	         width: 60,
			 menuDisabled: true,
	         dataIndex: 'unitprice',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	 
	     }, {
	         text: '金额',
	         width: 60,
			 menuDisabled: true,
	         dataIndex: 'amount',
			 align: 'right' 
	     }, {
	         text: '课时',
	         width: 60,
			 menuDisabled: true,
	         dataIndex: 'hour',
			 align: 'center'
			 
	     }, {
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_timely_icon.png',
				tooltip: '消耗课时',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onCourse(rec); 
				}	
			}] 		 			 
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