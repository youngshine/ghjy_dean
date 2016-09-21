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
			fieldLabel: '姓名'
		},{
			xtype: 'combo',
			name: 'subjectID',
			store: null, // Subject
			valueField: 'subjectID',
			displayField: 'subjectName',
			editable: false,
			fieldLabel: '学科'
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
		var subjectID = this.down('combo[name=subjectID]').getValue();
		//var note = this.down('textfield[name=note]').getValue().trim();
		
		if (teacherName == ''){
			Ext.Msg.alert('提示','姓名不能空白');
			return;
		}
		if (subjectID == null){
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