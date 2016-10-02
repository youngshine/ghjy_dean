Ext.define('Youngshine.view.accnt.List' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.accnt-list',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '缴费明细查询',

	tbar: [{
		xtype: 'datefield',
		name: 'startdate',
		fieldLabel: '日期范围',
		labelWidth: 55,
		labelAlign: 'right',
		format: 'Y-m-d',
		//value: new Date('2014-01-01'),
        value: new Date(),
        width: 155, 
        emptyText: '开始日期',
        allowBlank: false
    },{
        xtype: 'datefield',
		name: 'enddate',
		format: 'Y-m-d',
		value: new Date(),
        //fieldLabel: '至',
        width: 100,
        //margins: '0 0 0 6',
        emptyText: '结束日期',
        allowBlank: false	
	},{
		padding: '5,0',
		xtype: 'combo',
		width: 180,
		//fieldLabel: '分校区',
		//labelWidth: 45,
		labelAlign: 'right',
		itemId: 'schoolsub',
		store: 'Schoolsub',
		valueField: 'schoolsubID',
		displayField: 'fullname',
		//value: '全部分校区',
		emptyText: '选择分校区',
		//editable: false,
		//padding: '5 0', 
		/*
		listeners: {
			change: function(cb,newValue){
				var schoolsubID = newValue,
					payment = this.up('window').down('combo[itemId=payment]').getValue();
				this.up('window').onFilter(schoolsubID,payment); 
			}
		} */
	},{		
		xtype: 'combo',
		width: 80,
		//fieldLabel: '课程类型',
		//labelWidth: 55,
		emptyText: '课程类型',
		labelAlign: 'right',
		itemId: 'kcType',
		store: {
			fields: ['value'],
			data : [
				{"value":"大小班"},
				{"value":"一对一"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		//editable: false,
		//padding: '5 0',
	},{		
		xtype: 'combo',
		width: 80,
		//fieldLabel: '课程类型',
		//labelWidth: 55,
		emptyText: '付款方式',
		labelAlign: 'right',
		itemId: 'payment',
		store: {
			fields: ['value'],
			data : [
				{"value":"现金"},
				{"value":"刷卡"},
				{"value":"微信"},
				{"value":"支付宝"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		//editable: false,
		//padding: '5 0',
	},{
		xtype: 'combo',
		width: 80,
		emptyText: '缴费',
		labelAlign: 'right',
		itemId: 'refund',
		store: {
			fields: ['value'],
			data : [
				{"value":"缴费"},
				{"value":"退费"},
			]
		},
		valueField: 'value',
		displayField: 'value',	
		value: '缴费',
		queryMode: 'local',
		editable: false,
	},'-',{
		xtype: 'button',
		text: '查找',
		width: 80,	
		scope: this,
		handler: function(btn){
			btn.up('window').onSearch();
		},
		style: {
			//background: 'transparent',
			border: '1px solid #bbb'
		},
	}],
	fbar: [{
		xtype: 'label',
		html: '合计（元）:',
	},{
		xtype: 'displayfield',
		itemId: 'subtotal',
		value: 0,
	},'->',{	
		xtype: 'button',
		text: '导出Excel',
		//scale: 'medium',
		//width: 55,
		handler: function(btn){
			btn.up('window').onExcel(btn)
		}
	},{	
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
		store: 'Accnt',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	  
			 text: '日期',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'accntDate'
	     }, {
			 text: '类型',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'accntType'
	     }, {
			 text: '金额',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'amount',
			 align: 'right'
	     }, {
			 text: '欠费',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'amount_owe',
			 align: 'right'
	     }, {
			 text: '入帐',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'fullAmountPaid',
			 align: 'right'
	     }, {
			 text: '付款方式',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'payment'
	     }, {
			 text: '备注',
	         width: 200,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'note'
	     }, {
			 text: '归属咨询师',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'consultName_owe'
	     }, {
			 text: '分校区',
	         flex: 1,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'schoolsub'	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_right_icon.png',
				//tooltip: '测评内容',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onTopic(rec); 
				}	
			}]			 		 
	     }], 
		 
   	 	listeners: {
   	 		itemdblclick: function (view, record, row, i, e) {
   	 			this.up('window').onTopic(record);
   	 		},
   	 	},      
	}],
/*
	onFilter: function(schoolsubID,payment){
		var me = this; console.log(schoolsubID,payment)
		//var student = new RegExp("/*" + student); // 正则表达式
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		
		if(schoolsubID == null && payment != null )
			store.filter("payment", payment);
		
		if(payment == null && schoolsubID != null )
			store.filter("schoolsubID", schoolsubID);
		
		if(schoolsubID != null && payment != null )
			store.filter([
				{property: "payment", value: payment},
				{property: "schoolsubID", value: schoolsubID}, 
			]);
	},
*/	
	onSearch: function(){ 
		var me = this;
		var start = this.down('datefield[name=startdate]').getValue(),
			end = this.down('datefield[name=enddate]').value//.toLocaleDateString() 
			// 0点0分，不准确，要转换toLocal
		//end = new Date().format('yyyy-mm-dd')
		/*var user_id = this.down('combo[name=user_id]').getValue()
		if(user_id == null){
			user_id = 0
		} */
		var payment = this.down('combo[itemId=payment]').getValue(),
			kcType = this.down('combo[itemId=kcType]').getValue(),
			refund = this.down('combo[itemId=refund]').getValue(),
			schoolsubID = this.down('combo[itemId=schoolsub]').getValue();

		if(kcType == null){
			kcType = ''  // 空白''，代表全部
		}
		if(payment == null){
			payment = ''  // 空白''，代表全部
		}
		if(schoolsubID == null){
			schoolsubID = 0 // all
		}
		var obj = {
			start: start,
			end: end,
			kcType: kcType,
			payment: payment,
			refund: refund,
			schoolsubID: schoolsubID,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		this.fireEvent('search',obj,me);
	},	
	
	onExcel: function(btn){
		var me = this;
		/*
		try{
		   var oXL = new ActiveXObject("Excel.Application"); 
		}catch(e){
		   Ext.Msg.alert('警告',"请确认已经安装了Excel并允许运行Excel!");
		   btn.style.cursor = "hand";
		   return;
		}
		oXL.Workbooks.Add(); 
		var obook = oXL.ActiveWorkBook; 
		var osheets = obook.Worksheets;
		var osheet = obook.Sheets(1);
		var xlrow = 1; */
		
		exportexcel();
		
		//函数：exportexcel
		function exportexcel() {
			var grid = me.down('grid')
			
			var vExportContent = grid.getExcelXml();  
			console.log(vExportContent); return
			      
			if (Ext.isIE6 || Ext.isIE7 || Ext.isSafari || Ext.isSafari2 || Ext.isSafari3) {  
				if (! Ext.fly('frmDummy')) {             
					var frm = document.createElement('form');               
					frm.id = 'frmDummy';             
					frm.name = id;               
					frm.className = 'x-hidden';              
					document.body.appendChild(frm);            
				}           
				Ext.Ajax.request({              
					url: 'exportexcel.php',                 
					method: 'POST',                
					form: Ext.fly('frmDummy'),                 
					callback: function(o, s, r) {                   
						//alert(r.responseText);             
					},                
					isUpload: true,              
					params: {exportContent: vExportContent}            
				})        
			} else {            
				document.location = 'data:application/vnd.ms-excel;base64,' + 
					Base64.encode(vExportContent);       
			} 
		}
	}
});