Ext.define('Youngshine.view.ledger.List' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.ledger',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '日常收支',

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
		xtype: 'combo',
		width: 100,
		fieldLabel: '收支',
		labelWidth: 35,
		emptyText: '类型',
		labelAlign: 'right',
		name: 'ledgerType',
		store: {
			fields: ['value'],
			data : [
				{"value":"收入"},
				{"value":"支出"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		//editable: false,
		//padding: '5 0',
		listeners: {
			change: function( field, newValue, oldValue, eOpts ){
				//field.up('window').down('button[action=save]').setDisabled(false)
				field.up('window').onLedgerItem(newValue)
			}
		}
	},{		
		xtype: 'combo',
		width: 150,
		//fieldLabel: '课程类型',
		//labelWidth: 55,
		emptyText: '科目',
		labelAlign: 'right',
		name: 'ledgerItem',
		 queryMode: 'local',
		store: {
			fields: ['value'],
			data : null
		},
		valueField: 'value',
		displayField: 'value',
		//editable: false,
		//padding: '5 0',
		
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
			border: '1px solid #bbb',
			margin: '5px 0'
		},
		//glyph: 72,
	}],
	
	fbar: [{
		xtype: 'label',
		html: '收入:',
	},{
		xtype: 'displayfield',
		itemId: 'amt_in',
		value: 0,
	},{
		xtype: 'label',
		html: '支出:',
	},{
		xtype: 'displayfield',
		itemId: 'amt_out',
		value: 0,
	},{
		xtype: 'label',
		html: '余额:',
	},{
		xtype: 'displayfield',
		itemId: 'balance',
		value: 0,			
	},'->',{
		xtype: 'button',
		text: '＋记一笔',
		width: 65,
	    handler: function(btn){
			btn.up('window').onNew(); //onAdd是系统保留reserved word
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
		store: 'Ledger',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	  
			 text: '日期',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'ledgerDate'
	     }, {
			 text: '科目',
	         width: 150,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'ledgerItem'
	     }, {
			 text: '类型',
	         width: 40,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'ledgerType'
	     }, {
			 text: '收入金额',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'amt_in',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	
	     }, {
			 text: '支出金额',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'amt_out',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	
	     }, {
			 text: '备注',
	         flex: 1,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'note'
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
 				icon: 'resources/images/my_delete_icon.png',
 				tooltip: '删除',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onDelete(rec); 
				}	
			}]			 		 
	     }], 
		 /*
   	 	listeners: {
   	 		itemdblclick: function (view, record, row, i, e) {
   	 			this.up('window').onTopic(record);
   	 		},
   	 	},   */   
	}],

	onSearch: function(){ 
		var me = this;

		var start = this.down('datefield[name=startdate]').getValue(),
			end = this.down('datefield[name=enddate]').value//.toLocaleDateString() 
			// 0点0分，不准确，要转换toLocal
		//end = new Date().format('yyyy-mm-dd')
		var ledgerType = this.down('combo[name=ledgerType]').getValue(),
			ledgerItem = this.down('combo[name=ledgerItem]').getValue()

		if(ledgerType == null){
			ledgerType = ''  // 空白''，代表全部
		}
		if(ledgerItem == null){
			ledgerItem = ''  // 空白''，代表全部
		}

		var obj = {
			start: start,
			end: end,
			ledgerType: ledgerType,
			ledgerItem: ledgerItem,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		//this.fireEvent('search',obj,me);
		
		var store = me.down('grid').getStore(); //Ext.getStore('Accnt'); 
		store.removeAll();
        var url = Youngshine.app.getApplication().dataUrl + 
			'readLedgerList.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
				
				var amt_in = 0, amt_out = 0
				store.each(function(record){
					amt_in += parseInt(record.data.amt_in)
					amt_out += parseInt(record.data.amt_out)
				})
				me.down('displayfield[itemId=amt_in]').setValue(amt_in)
				me.down('displayfield[itemId=amt_out]').setValue(amt_out)
				me.down('displayfield[itemId=balance]').setValue(amt_in-amt_out)
            },
            scope: this
        });
	},	
	
	onNew: function(){ 
		this.down('grid').getSelectionModel().deselectAll();
		this.fireEvent('new');
	},
	onDelete: function(rec){
		var me = this;
		console.log(rec);
		Ext.Msg.confirm('询问','是否删除当前行？',function(btn){
			if(btn == 'yes'){
				me.fireEvent('del',rec);
			}
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
		    url: Youngshine.app.getApplication().dataUrl + 'export2ledger.php',
			//url: 'script/export2accnt.php',
		    params: obj, 
		    success: function(response){ 
				console.log(response.responseText)
				var ret = Ext.JSON.decode(response.responseText)
				console.log(ret.data)
		    }
		});
	},
	
	// 根据收入支出类型，设定科目
	onLedgerItem: function(ledgerType){
		var me = this
		var data = null
		if(ledgerType=='支出'){
			data = [
				{"value":"工资"},
				{"value":"办公费用"},
				{"value":"房租物业水电"},
				{"value":"购买教辅材料"},
				{"value":"市场营销经费"},
				{"value":"差旅费"},
				{"value":"其他"}
			]
		}else{
			data = [
				{"value":"学费"},
				{"value":"销售教辅材料"},
				{"value":"拓展活动"},
				{"value":"其他"},
			]
		}

		var cb = me.down('combo[name=ledgerItem]')
		cb.clearValue()
		cb.getStore().loadData(data)
	}
});