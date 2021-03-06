Ext.define('Youngshine.view.teacher.New', {
    extend: 'Ext.window.Window',
    alias : 'widget.teacher-new',

    title : '新增教师',
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
			name : 'teacherName',
			fieldLabel: '姓名',
			emptyText: '输入后回车自动生成账号',
			listeners: {
			    specialkey: function(field, e) {
			        if (e.getKey() === e.ENTER && !Ext.isEmpty(field.value)) {
						var py = Youngshine.getApplication().getController('Main').toPinyin(field.value)
						this.up('window').down('displayfield[name=userId]')
							.setValue(py+localStorage.schoolID)
			        }
			    },
		    },
		},{
			xtype: 'displayfield',
			name : 'userId',
			fieldLabel: '自动账号'
		},{
			xtype: 'combo',
			name: 'gender',
			store: {
				fields: ['value'],
				data : [
					{"value":"男"},
					{"value":"女"},
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '性别'
		},{
			xtype: 'textfield',
			name: 'phone',
			fieldLabel: '电话',
		},{
			xtype: 'combo',
			name: 'subjectID',
			store: null, // Subject
			valueField: 'subjectID',
			displayField: 'subjectName',
			editable: false,
			fieldLabel: '任课学科'
		},{
			xtype: 'textfield',
			name: 'note',
			fieldLabel: '备注',
			//hidden: true
		}],
	}],
	
    fbar : [{
		text: '保存', disabled: false,
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
		var teacherName = this.down('textfield[name=teacherName]').getValue().trim(),
			userId = this.down('displayfield[name=userId]').getValue(),
			gender = this.down('combo[name=gender]').getValue(),
			phone = this.down('textfield[name=phone]').getValue().trim(),
			note = this.down('textfield[name=note]').getValue().trim(),
			subjectID = this.down('combo[name=subjectID]').getValue(),
			subjectName = this.down('combo[name=subjectID]').getRawValue(),//前端显示用
			schoolID = localStorage.schoolID
		
		if (teacherName == ''){
			Ext.Msg.alert('提示','姓名不能空白');
			return;
		}
		if (userId == '' || userId==null){
			Ext.Msg.alert('没生成账号！')
			return;
		}
		if (gender == null){
			Ext.Msg.alert('提示','请选择性别');
			//me.down('label[itemId=errorMsg]').setText('请选择性别！')
			return;
		}
		if (phone == ''){
			Ext.Msg.alert('提示','电话不能空白');
			//me.down('label[itemId=errorMsg]').setText('电话不能空白！')
			return;
		}
		if (subjectID == null){
			Ext.Msg.alert('提示','请选择学科');
			return;
		}		
		
		var obj = {
			"teacherName": teacherName,
			"userId": userId,
			"gender": gender,
			"phone": phone,
			"note": note,	
			"subjectID": subjectID,	
			"subjectName": subjectName, //用于前端马上显示					
			"schoolID": schoolID, //当前学校
		};
		console.log(obj);

		Ext.Msg.confirm('询问','是否保存？',function(id){
			if( id == "yes"){
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});