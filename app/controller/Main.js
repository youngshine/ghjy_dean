// 主控制器，包括login
Ext.define('Youngshine.controller.Main', {
    extend: 'Ext.app.Controller',
	
	//stores: ['Admin'],
    views: [
        //'Main2', //equal to required
        'Viewport',
		//'admin.New',
		//'admin.Edit',
		//'Login',
    ],
	
	refs: [{
		ref: 'login',
		selector: 'login'	
	},{
		ref: 'pswreset',
		selector: 'pswreset'	
	},{
		ref: 'myviewport',
		selector: 'app-viewport'	
	},{	
		ref: 'main',
		selector: 'app-main'	
	}],

    init: function() {
        this.control({
			'login': {
                loginOk: this.loginOk,
            },
			'pswreset': {
				//afterrender: this.afterrenderUserList,
                save: this.pswresetSave,
            },
			'mywest': {
				navEnroll: this.navEnroll,
				navPrepaid: this.navPrepaid,//‚àö√£¬¨‚Ä¢‚Äö√¢‚Ä†‚Äö√Ñ‚àû≈ì√Ñ‚Äö√†√ª‚àö√£‚àö√≤‚àö¬∂‚àö√Ö¬¨√Ü‚àö¬£
				navStudy: this.navStudy, 
				navKcb: this.navKcb, //‚àö√Ö‚Äö√¢‚Ä†‚àö¬¢‚àö√á‚àö¬∂‚àö√±‚àö√§‚àö¬©‚àö‚â†‚àö√£‚àö√≤‚àö¬∂
				navAssess: this.navAssess, //‚àö√§¬¨¬µ‚àö¬£‚àö√£‚àö√≤‚àö√´
				navTeacher: this.navTeacher,
				navPricelist: this.navPricelist,
				
				navPswreset: this.navPswreset, 
				navLogout: this.navLogout,
            },
        });
    },

	// 用户而不是管理员admin登录成功，来自登录或注册成功直接跳转
    loginOk: function(obj,oldWin) {
        var me = this; //console.log(obj)
        Ext.data.JsonP.request({
            url: me.getApplication().dataUrl + 'login.php', 
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
                if(result.success){
					console.log(result.data)
					//localStorage.setItem('isLogin',true);
					localStorage.setItem('school',result.data.schoolName); //加盟校区
					localStorage.setItem('schoolID',result.data.schoolID);
	
					// 跳转页面 main
					me.main = Ext.create('Youngshine.view.Main')
					me.getMyviewport().add(me.main) // build
					oldWin.close(); //成功后关闭当前窗口
                }else{
				    //Ext.Msg.alert('提示',result.message); me.getLogin()
					oldWin.down('label[itemId=error]').setText(result.message)
                }
            },
            failure: function(result){
                //Ext.Msg.alert('提示','服务请求失败！');
				oldWin.down('label').setText('服务请求失败！')
            }
        });
    },
	
	// 密码重置reset	
	pswresetSave: function(obj,win){
		var me = this;
		//console.log(obj)
		Ext.data.JsonP.request({
			url: me.getApplication().dataUrl + 'updatePsw.php',
			callbackKey: 'callback',
			params:{
				data: JSON.stringify(obj)
			},
			success: function(result){
				if(result.success){
					Ext.Msg.alert('','密码修改成功！');
					win.close();
				}else{				
					Ext.Msg.alert('提示',result.message);
				}
			},
			failure: function(result){
				Ext.Msg.alert('提示','连接服务器失败');
			}
		});
	},
	
	//
	navEnroll: function(){
		this.getApplication().getController('Student').showEnroll();
	},

	navPrepaid: function(){
		this.getApplication().getController('Prepaid').showPrepaid(1);
	},	

	navStudy: function(){
		//this.getApplication().getController('Study').showStudy();
		this.getApplication().getController('Prepaid').showPrepaid(0);
	},	

	navKcb: function(){
		this.getApplication().getController('Study').showKcb();
	},

	navAssess: function(){
		this.getApplication().getController('Assess').showAssess();
	},
	
	// ‚àö√§‚Äö√†√´¬¨‚Ñ¢‚àö√á‚àö¬ß‚Äö√Ñ‚Ä†‚àö√§‚àö√ò‚àö¬•‚àö√á‚Äö√†√®‚àö‚Ä†
	navTeacher: function(){
		this.getApplication().getController('Teacher').showTeacher();
	},
	
	// ‚àö√£‚àö√≤‚àö¬∂‚àö√Ö¬¨√Ü‚àö¬£‚Äö√Ñ‚àû¬¨‚Ñ¢‚Äö√†√´‚àö√§‚Äö√Ñ‚Ä†¬¨‚à´‚àö√£¬¨‚àû¬¨√Ü
	navPricelist: function(){
		this.getApplication().getController('Prepaid').showPricelist();
	},
	
	navPswreset: function(){	
		var win = Ext.create('Youngshine.view.login.Pswreset') //Ext.widget('pswreset')
		win.down('displayfield[name=username]').setValue(localStorage.consultName)
	},		
	navLogout: function(){
		//window.location.reload();
		//document.location = 'http://www.youngshine.com'; //‚àö√£‚àö‚àè‚àö√Ü‚àö√á‚àö¬µ‚àö¬™‚Äö√Ñ‚àû‚Äö√†√®¬¨‚Ñ¢‚àö√†¬¨‚àû¬¨¬µ
		//localStorage.setItem('isLogin',false);
		localStorage.setItem('schoolID','');
		localStorage.setItem('schoolName','');
		
		window.location = 'index.html';
	}
});
