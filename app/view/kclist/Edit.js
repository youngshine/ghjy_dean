Ext.define('Youngshine.view.kclist.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.kclist-edit',
    title : '修改课程',
    //layout: 'fit',
	
	width: 400,
	//height: 300,
	
    autoShow: true,
    modal: true,
	resizable: false,
	closable: false,

	items: [{
		xtype: 'form',
		bodyPadding: 10,
		fieldDefaults: {
			labelWidth: 85,
			labelAlign: 'right',
			anchor: '100%'
		},
		items: [{
			xtype: 'textfield',
			name : 'title',
			fieldLabel: '课程名称'
		},{
			xtype: 'combo',
			name: 'kcType',
			store: {
				fields: ['value', 'name'],
				data : [
					{"value":"大小班", "name":"大小班"},
					{"value":"一对一", "name":"一对一"}
				]
			},
			valueField: 'value',
			displayField: 'name',
			editable: false,
			fieldLabel: '课程类别'
		},{
			xtype: 'combo',
			name: 'kmType',
			store: {
				fields: ['value', 'name'],
				data : [
					{"value":"数理化", "name":"数理化"},
					{"value":"语政英", "name":"语政英"},
					{"value":"史地生", "name":"史地生"},
					{"value":"艺术", "name":"艺术"}
				]
			},
			valueField: 'value',
			displayField: 'name',
			editable: false,
			fieldLabel: '学科'
		},{
			xtype: 'numberfield',
			name : 'unitprice',
			fieldLabel: '单价'
		},{
			xtype: 'numberfield',
			name : 'hour',
			fieldLabel: '课时数'
		},{
			xtype: 'numberfield',
			name : 'amount',
			fieldLabel: '金额'
		},{
			xtype: 'hiddenfield',
			name: 'kclistID', //修改的唯一id,隐藏
		}],
	}],
	
    fbar : [{
		text: '保存', disabled: true,
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
		var title = this.down('textfield[name=title]').getValue().trim(),
			kcType = this.down('combo[name=kcType]').getValue(),
			kmType = this.down('combo[name=kmType]').getValue(),
			unitprice = this.down('numberfield[name=unitprice]').getValue(),
			hour = this.down('numberfield[name=hour]').getValue(),
			amount = this.down('numberfield[name=amount]').getValue(),
			kclistID = this.down('hiddenfield[name=kclistID]').getValue();

		if (title == ''){
			Ext.Msg.alert('提示','课程名称不能空白');
			return;
		}
		
		Ext.Msg.confirm('询问','确认修改保存？',function(id){
			if( id == "yes"){
				var obj = {
					"title": title,
					"kcType": kcType,
					"kmType": kmType,
					"unitprice": unitprice,
					"hour": hour,
					"amount": amount,
					"kclistID": kclistID
				};
				console.log(obj);
				//me.close();
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});