// 日常收支记账
Ext.define('Youngshine.controller.Ledger', {
    extend: 'Ext.app.Controller',

	//stores: ['Ledger'],
	
    refs: [{
		ref: 'ledger',
		selector: 'ledger'	
	},{
		ref: 'ledgernew',
		selector: 'ledger-new'	
	}],

    init: function() {
        this.control({
			'ledger': {
				new: this.ledgerNew,
				del: this.ledgerDelete,
			},	
			'ledger-new': {
				save: this.ledgernewSave,
			},			
        });
    },

	// 课程销售单，show跳转来自main controller
	showLedger: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.ledger.List');
		win.down('grid').getStore().removeAll(); // 先晴空
		/*
		var obj = {
			"schoolID": localStorage.getItem('schoolID'),
		} 
        var url = this.getApplication().dataUrl + 
			'readLedgerList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Ledger');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });  */
		
		/* 收支项目
	    var url = this.getApplication().dataUrl + 
			'readLedgerItems.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('LedgerItems');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });  */
	},	

    ledgerNew: function(button) {
		var me = this;
		me.ledgernew = Ext.create('Youngshine.view.ledger.New')
    },
	
	ledgernewSave: function(obj,win){ //obj用户信息
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在保存',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.Ajax.request({
            url: me.getApplication().dataUrl + 'createLedger.php',
            params: obj,
            success: function(response){
				Ext.MessageBox.hide(); 
				var ret = JSON.parse(response.responseText)
				if(ret.success){
					obj.ledgerID = ret.data.ledgerID; // model数组添加项目
					Ext.getStore('Ledger').insert(0,obj); //新增记录，排在最前面
					win.close(); //成功保存才关闭窗口
				}else{		
					Ext.Msg.alert('提示',ret.message);
				}	
			},
			failure: function(response){
				Ext.MessageBox.hide();
				Ext.Msg.alert('网络错误','服务请求失败');
			}
        });
	},	
		
	ledgerDelete: function(record){
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在删除...',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		console.log(record)
		Ext.Ajax.request({
			// 删除服务端记录: 最好做个标记，别真正删除？或者过期的和定期的不能删除？
			url: me.getApplication().dataUrl + 'deleteLedger.php',
			//callbackKey: 'callback',
			params:{
				"ledgerID": record.data.ledgerID
			},
			success: function(response){
				Ext.MessageBox.hide();
				var ret = JSON.parse(response.responseText)
				if(ret.success){
					var store = Ext.getStore('Ledger'); //移除本地store记录
					store.remove(record); //.removeAt(i); 
				}else{
					Ext.Msg.alert('提示',ret.message);
				}
			},
			failure: function(){
				Ext.MessageBox.hide();
				Ext.Msg.alert('网络错误','服务请求失败');
			}
		});	
	},
});