Ext.define('Youngshine.view.ledger.New', {
    extend: 'Ext.window.Window',
    alias : 'widget.ledger-new',

    title : '新增记账',
    //layout: 'fit',
	
	width: 400,
	//height: 300,
	modal: true,
    autoShow: true,
	resizable: false,
	closable: false,
	
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		fieldDefaults: {
			labelWidth: 65,
			labelAlign: 'right',
			anchor: '100%'
		},
		items: [{
			xtype: 'datefield',
            fieldLabel: '日期',
			format: 'Y-m-d',
            name: 'ledgerDate',
            allowBlank: false,
			value: new Date()	
		},{
			xtype: 'combo',
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
			editable: false,
			fieldLabel: '费用类型',
			listeners: {
				change: function( field, newValue, oldValue, eOpts ){
					//field.up('window').down('button[action=save]').setDisabled(false)
					field.up('window').onLedgerItem(newValue)
				}
			}	
		},{
			xtype: 'combo',
			name: 'ledgerItem',
			queryMode: 'local',
			store: {
				fields: ['value'], 
				data: null
				/*
				data : [
					{"value":"工资"},
					{"value":"办公费用"},
					{"value":"史地生"},
					{"value":"艺术"}
				] */
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '科目'
		},{	
			xtype: 'numberfield',
			name : 'amount',
			fieldLabel: '金额',
			//value: 0
		},{
			xtype: 'textareafield',
			name: 'note',
			fieldLabel: '备注',		
		}],
	}],
	
    fbar : [{
		text: '保存', 
		width: 45,
		action: 'save',
		//scope: this,
		handler: function(btn){
			btn.up('window').onSave();
		}
	},{
		text: '取消',
		width: 45,
		//scope: this,
		handler: function(btn){
			btn.up('window').destroy();
			//this.close();
		}
	}],	
   
	onSave: function(){
		var me = this;  
		
		var ledgerDate = this.down('datefield[name=ledgerDate]').getValue(), 
			ledgerType = this.down('combo[name=ledgerType]').getValue(),
			ledgerItem = this.down('combo[name=ledgerItem]').getValue(),
			amount = this.down('numberfield[name=amount]').getValue(),
			note = this.down('textareafield[name=note]').getValue().trim()
		
		if (ledgerType == ''){
			Ext.Msg.alert('提示','请选择费用类型');
			return;
		}
		if (ledgerItem == null){
			Ext.Msg.alert('提示','请选择科目');
			return;
		}
		if (amount==0 || amount==null){
			Ext.Msg.alert('提示','请填写金额');
			return;
		}	
		
		var amt_in = ledgerType=='收入' ? amount : 0
		var amt_out = ledgerType=='支出' ? amount : 0
		
		var obj = {
			"ledgerType": ledgerType,
			"ledgerItem": ledgerItem,
			"ledgerDate": ledgerDate,
			//"amout": amount,
			"amt_in": amt_in,
			"amt_out": amt_out,
			"note": note,
			"schoolID": localStorage.schoolID
		};
		console.log(obj);

		Ext.Msg.confirm('询问','是否新增保存？',function(id){
			if( id == "yes"){
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
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