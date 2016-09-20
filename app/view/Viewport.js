Ext.define('Youngshine.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'Youngshine.view.login.Login'
    ],
	alias: 'widget.app-viewport', // i added
	
    layout: {
        type: 'fit'
    },

    //items: [{
        //xtype: 'app-main'
	//},{	
		//xtype: 'admin-login' //管理 或 客户user登录 Main控制器
	//}],
	
	// 登录后，根据不同角色，不同界面Main
	initComponent: function(){
		//Ext.fly('appLoadingIndicator').destroy(); //去掉启动画面flash
	
		var win = Ext.widget('login'); //一开始，登录窗口
		//win.down('textfield[name=username]').setValue(localStorage.admin_name)

	
		this.callParent()
	}
});
