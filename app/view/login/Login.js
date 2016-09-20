Ext.define('Youngshine.view.login.Login', {
    //extend: 'Ext.form.Panel',
    //xtype: 'register-form',
    extend: 'Ext.window.Window',
	alias: 'widget.login',
	
	requires: [
       'Ext.window.*',
    ], 	
	
	autoShow: true,
	closable: false,
	modal: true,
	//resizable: false,
    frame: true,
    //bodyPadding: 10,
    //autoScroll:true,
    width: 350,
	
	title: '根号教育服务平台－校长端',

    items: [{
        xtype: 'image',
		height: 80,
		width: '100%',
		bodyPadding: 10,
		src: 'resources/images/banner.jpg'
	},{
		xtype: 'form',
		bodyPadding: 10,
        //title: '操作员登录',
		//width: '100%',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%',
        },
	    fieldDefaults: {
	        labelAlign: 'right',
	        labelWidth: 65,
	        msgTarget: 'side'
	    },
        items: [{ 
			allowBlank:false, 
			fieldLabel: '联盟学校', 
			name: 'school', 
			emptyText: '录入学校名称',
		},{ 
			allowBlank:false, 
			fieldLabel: '密码', 
			name: 'psw', 
			emptyText: '', 
			inputType: 'password',
			value: '123456' 
		}]
    }],

    fbar: [{
    	xtype: 'label',
		text: '',
		style: 'color:red;',
		itemId: 'error'
    },'->',{
        text: '登录',
        //disabled: true,
        //formBind: true
		handler: function(btn){
			btn.up('window').onLogin();
		}
	},{
		text: '取消'	,
		disabled: true,
		handler: function(btn){
			btn.up('window').destroy();
			//document.location = 'http://www.fclfj.com';
		},
    }],
	
    onLogin: function(button, e, eOpts) {
        var me = this;
		var psw = this.down('textfield[name=psw]').getValue().trim(),
			school = this.down('textfield[name=school]').getRawValue().trim()

		if (school == null || school == ''){
			me.down('label').setText('请填写学校名称！')
			return;
		}
        if(psw.length < 6){
			me.down('label').setText('密码长度至少6位！')
            return;
        }
        var obj = {
            'psw': psw,
			'school': school
        }

        this.fireEvent('loginOk', obj, me); //login控制器
    },
});