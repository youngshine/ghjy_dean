Ext.define('Youngshine.view.consult.New', {
    extend: 'Ext.window.Window',
    alias : 'widget.consult-new',

    title : '新增咨询师',
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
			name : 'consultName',
			fieldLabel: '姓名',
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
		}],
	}],
	
    fbar : [{
    	xtype: 'label',
		text: '',
		style: 'color:red;',
		itemId: 'errorMsg'
    },'->',{
		text: '保存', disabled: false, //牵涉到自动拼音账号
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
			userId = this.down('displayfield[name=userId]').getValue(),
			gender = this.down('combo[name=gender]').getValue(),
			phone = this.down('textfield[name=phone]').getValue().trim(),
			note = this.down('textfield[name=note]').getValue().trim(),
			schoolsubID = this.down('combo[name=schoolsubID]').getValue(),
			schoolID = localStorage.schoolID  //当前学校
		
		if (consultName == ''){
			me.down('label[itemId=errorMsg]').setText('姓名不能空白！')
			return;
		}
		if (phone == ''){
			//Ext.Msg.alert('提示','姓名不能空白');
			me.down('label[itemId=errorMsg]').setText('电话不能空白！')
			return;
		}
		if (gender == null){
			//Ext.Msg.alert('提示','请选择性别');
			me.down('label[itemId=errorMsg]').setText('请选择性别！')
			return;
		}	
		if (schoolsubID == null){
			//Ext.Msg.alert('提示','请选择所属分校区！');
			me.down('label[itemId=errorMsg]').setText('请选择所属分校区！')
			return;
		}	
		
		var obj = {
			"consultName": consultName,
			"userId": userId,
			"gender": gender,
			"phone": phone,
			"note": note,	
			"schoolsubID": schoolsubID,						
			"schoolID": schoolID, //当前学校
		};
		console.log(obj);

		Ext.Msg.confirm('询问','是否保存？',function(id){
			if( id == "yes"){
				//me.fireEvent('save',obj,me); //后台数据判断，才能关闭  本窗口win
			}
		})
	}
});