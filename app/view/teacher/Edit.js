Ext.define('Youngshine.view.teacher.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.teacher-edit',
    title : '修改教师资料',
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
			labelWidth: 80,
			labelAlign: 'right',
			anchor: '100%'
		},
		items: [{
			xtype: 'textfield',
			name : 'teacherName',
			fieldLabel: '姓名'
		},{
			xtype: 'displayfield',
			name : 'userId',
			fieldLabel: '微信账号'
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
			store: 'Subject',
			valueField: 'subjectID',
			displayField: 'subjectName',
			editable: false,
			fieldLabel: '学科'
		},{
			xtype: 'textfield',
			name: 'note',
			fieldLabel: '备注',
			
		},{
			xtype: 'hiddenfield',
			name: 'teacherID',
			hidden: true //修改的唯一id,隐藏
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
		var teacherName = this.down('textfield[name=teacherName]').getValue().trim(),
			gender = this.down('combo[name=gender]').getValue(),
			phone = this.down('textfield[name=phone]').getValue().trim(),
			note = this.down('textfield[name=note]').getValue().trim(),
			subjectID = this.down('combo[name=subjectID]').getValue(),
			subjectName = this.down('combo[name=subjectID]').getRawValue(),
			teacherID = this.down('hiddenfield[name=teacherID]').getValue(); //unique

		if (teacherName == ''){
			Ext.Msg.alert('提示','姓名不能空白');
			return;
		}
		
		Ext.Msg.confirm('询问','确认修改保存？',function(id){
			if( id == "yes"){
				var obj = {
					"teacherName": teacherName,
					"gender": gender,
					"phone": phone,
					"note": note,
					"subjectID": subjectID,
					"subjectName": subjectName,
					"teacherID": teacherID
				};
				console.log(obj);
				//me.close();
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});