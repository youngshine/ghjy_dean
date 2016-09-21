Ext.define('Youngshine.view.accnt.Consult' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.accnt-consult',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '咨询师业绩统计',

	tbar: [{
		padding: '5,0',
		xtype: 'combo',
		width: 150,
		fieldLabel: '咨询师',
		labelWidth: 45,
		labelAlign: 'right',
		itemId: 'consult',
		store: 'Consult',
		valueField: 'consultID',
		displayField: 'consultName',
		//value: '全部分校区',
		//emptyText: '选择咨询师',
		editable: false,
	},{	
		//padding: '5,0',
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
		xtype: 'combo',
		width: 140,
		fieldLabel: '课程类型',
		labelWidth: 55,
		//emptyText: '课程类型',
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
	},{
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
			btn.up('window').onExcel()
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
		var kcType = this.down('combo[itemId=kcType]').getValue(),
			refund = this.down('combo[itemId=refund]').getValue(),
			consultID = this.down('combo[itemId=consult]').getValue();

		if(consultID == null){
			Ext.Msg.alert('提示','请选择咨询师');
			return;
		}
		if(kcType == null){
			kcType = ''  // 空白''，代表全部
		}

		var obj = {
			start: start,
			end: end,
			kcType: kcType,
			//payment: payment,
			refund: refund,
			consultID: consultID,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		this.fireEvent('search',obj,me);
	},	
});