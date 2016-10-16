Ext.define('Youngshine.view.accnt.AccntConsult' ,{
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
	defaultFocus : 'consult', 

    title : '咨询师业绩统计',

	tbar: [{
		padding: '5,0',
		xtype: 'combo',
		width: 200,
		//fieldLabel: '咨询师',
		//labelWidth: 45,
		//labelAlign: 'right',
		itemId: 'consult',
		store: 'Consult',
		valueField: 'consultID',
		displayField: 'consultName',
		//value: '全部分校区',
		emptyText: '选择业绩归属咨询师',
		editable: false,
		listConfig: {
            itemTpl: '{consultName} - {schoolsub}'
        },	
		queryMode: 'local'	
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
		emptyText: '',
		labelAlign: 'right',
		itemId: 'refund',
		store: {
			fields: ['value'],
			data : [
				{"value":"正常"},
				{"value":"退单"},
			]
		},
		value: '正常',
		valueField: 'value',
		displayField: 'value',	
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
	         text: '课程金额',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'amount_ys',
			 align: 'right'	
	     }, {
	         text: '打折(元)',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'discount',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	
	     }, {
	         text: '折后金额',
	         width: 60,
			 menuDisabled: true,
	         dataIndex: 'amount',
			 align: 'right'
	     }, {
	         text: '欠费(元)',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'balance',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	

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
				icon: 'resources/images/my_kclist_icon.png',
				tooltip: '课程明细',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAccntDetail(rec); 
				}	
			}]	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_pay_icon.png',
				tooltip: '缴款记录',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAccntFee(rec); 
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
			consultID_owe: consultID,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		this.fireEvent('search',obj,me);
	},	
	
	// 缴费的子表明细
	onAccntDetail: function(record){
		var obj = {
			"accntID": record.get('accntID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readAccntDetailByAccnt.php', 
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
						title += (i+1) + '、' + arr[i].title + '：' + 
							arr[i].hour+'课时'+ arr[i].amount+'元' + '<br>';
					Ext.MessageBox.alert('课程明细',title)
                }
            },
        });
	},
	
	// 缴款记录
	onAccntFee: function(record){
		var obj = {
			"accntID": record.get('accntID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readAccntFee.php', 
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
						title += (i+1) + '、' + arr[i].feeDate + arr[i].payment + 
							'：' + arr[i].amount+'元' + '<br>';
					Ext.MessageBox.alert('缴款记录',title)
                }
            },
        });
	},
});