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
			labelWidth: 95,
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
				fields: ['value'],
				data : [
					{"value":"大小班"},
					{"value":"一对一"}
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '类型'
		},{
			xtype: 'combo',
			name: 'kmType',
			store: {
				fields: ['value'],
				data : [
					{"value":"数理化"},
					{"value":"语政英"},
					{"value":"史地生"},
					{"value":"艺术"}
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '学科类别'
		},{
			xtype: 'combo',
			name: 'sectionName',
			store: {
				fields: ['value'],
				data : [
					{"value":"幼儿"},
					{"value":"小学"},
					{"value":"初中"},
					{"value":"高中"}
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '学段'
		},{
			xtype: 'numberfield',
			name : 'unitprice',
			fieldLabel: '一对一单价'
		},{
			xtype: 'numberfield',
			name : 'hour',
			fieldLabel: '班级课时数'
		},{
			xtype: 'numberfield',
			name : 'amount',
			fieldLabel: '班级收费金额'
		},{
			xtype: 'hiddenfield',
			name: 'kclistID', //修改的唯一id,隐藏
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
		var title = this.down('textfield[name=title]').getValue().trim(),
			kcType = this.down('combo[name=kcType]').getValue(),
			kmType = this.down('combo[name=kmType]').getValue(),
			sectionName = this.down('combo[name=sectionName]').getValue(),
			unitprice = this.down('numberfield[name=unitprice]').getValue(),
			hour = this.down('numberfield[name=hour]').getValue(),
			amount = this.down('numberfield[name=amount]').getValue(),
			kclistID = this.down('hiddenfield[name=kclistID]').getValue() // unique

		if (title == ''){
			Ext.Msg.alert('提示','课程名称不能空白');
			return;
		}
		
		var obj = {
			"title": title,
			"kcType": kcType,
			"kmType": kmType,
			"sectionName": sectionName,
			"unitprice": unitprice,
			"hour": hour,
			"amount": amount,
			"kclistID": kclistID
		};
		console.log(obj);
		
		Ext.Msg.confirm('询问','确认修改保存？',function(id){
			if( id == "yes"){
				//me.close();
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});