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
			xtype: 'textfield',
			name : 'title',
			fieldLabel: '课程名称'
		},{
			xtype: 'combo',
			name: 'subjectID',
			store: 'Subject',
			valueField: 'subjectID',
			displayField: 'subjectName',
			editable: false,
			fieldLabel: '学科',
		},{
			xtype: 'combo',
			name: 'gradeID',
			store: 'Grade', // Ext.getStore('Grade')
			valueField: 'gradeID',
			displayField: 'gradeName',
			editable: false,
			fieldLabel: '年级',
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
			subjectID = this.down('combo[name=subjectID]').getValue(),
			subjectName = this.down('combo[name=subjectID]').getRawValue(),
			gradeID = this.down('combo[name=gradeID]').getValue(),
			gradeName = this.down('combo[name=gradeID]').getRawValue(),
			unitprice = this.down('numberfield[name=unitprice]').getValue(),
			hour = this.down('numberfield[name=hour]').getValue(),
			amount = this.down('numberfield[name=amount]').getValue(),
			kclistID = this.down('hiddenfield[name=kclistID]').getValue() // unique

		if (title == ''){
			Ext.Msg.alert('提示','课程名称不能空白');
			return;
		}
		if (unitprice==0 && hour==0 ){
			Ext.Msg.alert('提示','请输入一对一单价或班级课时数');
			return;
		}	
		if (unitprice != 0 && hour != 0 ){
			Ext.Msg.alert('提示','不能同时输入一对一单价和班级课时数');
			return;
		}
		
		var obj = {
			"title": title,
			"kcType": kcType,
			"subjectID": subjectID,
			"subjectName": subjectName,
			"gradeID": gradeID,
			"gradeName": gradeName,
			"unitprice": unitprice,
			"hour": hour,
			"amount": amount,
			"kclistID": kclistID
		};
		console.log(obj);
		
		Ext.Msg.confirm('询问','确认修改保存？',function(id){
			if( id == "yes"){
				//me.close();
				me.fireEvent('save',obj,me); 
				//后台数据判断，才能关闭  本窗口win
			}
		})
	}
});