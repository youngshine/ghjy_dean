Ext.define('Youngshine.view.consult.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.consult-edit',
	
    title : '修改咨询师',
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
			name : 'consultName',
			fieldLabel: '姓名'
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
			name: 'schoolsubID',
			store: 'Schoolsub',
			valueField: 'schoolsubID',
			displayField: 'fullname',
			editable: false,
			fieldLabel: '所属分校区'
		},{
			xtype: 'textfield',
			name: 'note',
			fieldLabel: '备注',
			//hidden: true
			
		},{
			xtype: 'hiddenfield',
			name: 'consultID',
			hidden: true //修改的唯一id,隐藏
		}],
	}],
	
    fbar : [{
    	xtype: 'label',
		text: '',
		style: 'color:red;',
		itemId: 'errorMsg'
    },'->',{
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
		
		me.down('label[itemId=errorMsg]').setText('')
		
		var consultName = this.down('textfield[name=consultName]').getValue().trim(),
			gender = this.down('combo[name=gender]').getValue(),
			phone = this.down('textfield[name=phone]').getValue().trim(),
			note = this.down('textfield[name=note]').getValue().trim(),
			schoolsubID = this.down('combo[name=schoolsubID]').getValue(),
			consultID = this.down('hiddenfield[name=consultID]').getValue() //unqiue

		if (consultName == ''){
			//Ext.Msg.alert('提示','姓名不能空白');
			me.down('label[itemId=errorMsg]').setText('姓名不能空白！')
			return;
		}
		
		var obj = {
			"consultName": consultName,
			"gender": gender,
			"phone": phone,
			"note": note,	
			"schoolsubID": schoolsubID,						
			//"schoolID": localStorage.schoolID, //当前学校
			//"userId" : userId,
			"consultID": consultID // unique
		};
		console.log(obj);
		
		Ext.Msg.confirm('询问','确认修改保存？',function(id){
			if( id == "yes"){
				me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});