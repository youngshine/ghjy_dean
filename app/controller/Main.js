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
				student: this.navStudent,
				schoolsub: this.navSchoolsub,
				consult: this.navConsult,
				teacher: this.navTeacher,
				kclist: this.navKclist,
				accnt: this.navAccnt, //课程销售单
				accntfee: this.navAccntFee,//财务缴款
				accntconsult: this.navAccntConsult,
				
				course: this.navCourse, //统计教师课时
				
				ledger: this.navLedger, //日常收支
				
				pswreset: this.navPswreset, 
				logout: this.navLogout,
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
					//console.log(result.data) //密码问题
					//localStorage.setItem('isLogin',true);
					localStorage.setItem('school',result.data.schoolName); //加盟校区
					localStorage.setItem('schoolID',result.data.schoolID);
	
					// 跳转页面 main
					me.main = Ext.create('Youngshine.view.Main');
					me.main.down('container[region=north]').html = result.data.schoolName
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
	navStudent: function(){
		this.getApplication().getController('Student').showStudent();
	},

	navSchoolsub: function(){
		this.getApplication().getController('Schoolsub').showSchoolsub(1);
	},	

	navAccnt: function(){
		this.getApplication().getController('Accnt').showAccnt();
	},
	
	navConsult: function(){
		//this.getApplication().getController('Study').showStudy();
		this.getApplication().getController('Consult').showConsult(0);
	},	
	navTeacher: function(){
		this.getApplication().getController('Teacher').showTeacher();
	},

	navKclist: function(){
		this.getApplication().getController('Kclist').showKclist();
	},
	
	navAccnt: function(){
		this.getApplication().getController('Accnt').showAccnt();
	},
	navAccntFee: function(){
		this.getApplication().getController('Accnt').showAccntFee();
	},
	navAccntConsult: function(){
		this.getApplication().getController('Accnt').showAccntConsult();
	},
	
	navCourse: function(){
		this.getApplication().getController('Teacher').showTeacherCourse();
	},
	
	// 日常收支记账
	navLedger: function(){
		this.getApplication().getController('Ledger').showLedger();
	},
	
	navPswreset: function(){	
		var win = Ext.create('Youngshine.view.login.Pswreset') //Ext.widget('pswreset')
		win.down('displayfield[name=username]').setValue(localStorage.school)
	},		
	navLogout: function(){
		//window.location.reload();
		//document.location = 'http://www.youngshine.com'; /
		localStorage.setItem('schoolID','');
		localStorage.setItem('schoolName','');
		
		window.location = 'index.html';
	}
});
