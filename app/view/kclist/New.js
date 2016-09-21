Ext.define('Youngshine.view.kclist.New', {
    extend: 'Ext.window.Window',
    alias : 'widget.kclist-new',

    title : '新增课程',
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
			labelWidth: 80,
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
			xtype: 'textfield',
			name: 'note',
			fieldLabel: '备注',
			hidden: true
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
		var teacherName = this.down('textfield[name=teacherName]').getValue().trim();
		var subject = this.down('combo[name=subject]').getValue();
		//var note = this.down('textfield[name=note]').getValue().trim();
		
		if (teacherName == ''){
			Ext.Msg.alert('提示','姓名不能空白');
			return;
		}
		if (subject == null){
			Ext.Msg.alert('提示','请选择学科');
			return;
		}		

		Ext.Msg.confirm('询问','是否保存？',function(id){
			if( id == "yes"){
				//if(viewEF.isValid()){
					var obj = {
						"teacherName": teacherName,
						"subjectID": subjectID,
						"subjectName": subjectName,

					};
					console.log(obj);
					//me.close();
					me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
				//}
			}
		})
	}
});