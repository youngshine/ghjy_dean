Ext.define('Youngshine.view.accnt.AccntFee' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.accnt-fee',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '缴款明细查询',

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
        //emptyText: '结束日期',
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
		emptyText: '',
		labelAlign: 'right',
		itemId: 'refund',
		store: {
			fields: ['value'],
			data : [
				{"value":"缴费"},
				{"value":"退单"},
			]
		},
		value: '缴费',
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
		//glyph: 72,
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
		text: '下载Excel',
		tooltip: '下载导出报表', 
		action: 'download',
		disabled: true,
		href: 'script/output.xls',
		style: {
			background: 'none',
			border: 0,
			'text-decoration': 'underline'
		}
	},{
		xtype: 'button',
		text: '导出Excel',
		//scale: 'medium',
		//width: 55,
		handler: function(btn){
			btn.up('window').onExport2Excel(btn)
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
		store: 'AccntFee',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	  
			 text: '日期',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'feeDate'
	     }, {
			 text: '金额',
	         width: 80,
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
			 text: '单据号',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'accntID'
	     }, {
			 text: '学生',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'studentName'
	     }, {
			 text: '咨询师',
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
				icon: 'resources/images/my_kclist_icon.png',
				tooltip: '学生',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAccnt(rec); 
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
		
		me.down('button[action=download]').setDisabled(true)
		
		var start = this.down('datefield[name=startdate]').getValue(),
			end = this.down('datefield[name=enddate]').value//.toLocaleDateString() 
			// 0点0分，不准确，要转换toLocal
		start = Ext.Date.format(start, 'Y-m-d')
		end = Ext.Date.format(end, 'Y-m-d')
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
		//this.fireEvent('search',obj,me);
		
		var store = me.down('grid').getStore(); //Ext.getStore('Accnt'); 
		store.removeAll();
        var url = Youngshine.app.getApplication().dataUrl + 
			'readAccntFeeList.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
				var total = 0
				store.each(function(record){
					total += parseInt(record.data.amount)
				})
				me.down('displayfield[itemId=subtotal]').setValue(total)
            },
            scope: this
        });
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
	
	onExport2Excel: function(btn){
		var me = this; // export2accnt.excel store.data

		var arrList = [] //,jsonList = {};
		var store = me.down('grid').getStore()
		store.each(function(rec,index){
			arrList.push(rec.data)
			//jsonList[index] = rec.data.kclistID 
		})
		if (arrList.length == 0){	
			Ext.Msg.alert('提示','没有可导出的记录！');
			return;
		}
		me.down('button[action=download]').setDisabled(false)
		//console.log(arrList);
		//console.log(JSON.stringify(jsonList));
		//arrList = JSON.stringify(jsonList); 
		arrList = JSON.stringify(arrList); //传递到后台，必须字符串
		//console.log(arrList);
		var obj = {
			"arrList": arrList
		}
		console.log(obj)
		
		Ext.Ajax.request({
		    url: Youngshine.app.getApplication().dataUrl + 'export2accnt.php',
			//url: 'script/export2accnt.php',
		    params: obj, 
		    success: function(response){ 
				console.log(response.responseText)
				var ret = Ext.JSON.decode(response.responseText)
				console.log(ret.data)
		    }
		});
	}
});