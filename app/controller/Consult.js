Ext.define('Youngshine.controller.Consult', {
    extend: 'Ext.app.Controller',

    views: [
        //'admin.List', //equal to required
    ],
	
	//stores: ['Student'],

    refs: [{
		ref: 'consult',
		selector: 'consult-list'
    },{
		ref: 'consultnew',
		selector: 'consult-new'
	},{
		ref: 'consultedit',
		selector: 'consult-edit'
	}],

    init: function() {
        this.control({
            'consult-list': {
				addnew: this.consultNew,
				edit: this.consultEdit, //自定义事件 user...
				del: this.consultDelete,
				chief: this.consultChief, //设置为咨询主管、分校长
            },
			'consult-edit': {
				save: this.consulteditSave, 
            },
			'consult-new': {
                save: this.consultnewSave,
            },		
        });
    },

	// 教师信息，包括添加删除排课以及历史报读课程，show跳转来自main controller
	showConsult: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.consult.List') 
		//Ext.widget('student-list');
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID')
		}
        var url = this.getApplication().dataUrl + 
			'readConsultList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Consult');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });
		
		// 该校的分校区
	    var url = this.getApplication().dataUrl + 
			'readSchoolsubList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Schoolsub');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });
	},	
	
    consultNew: function(button) {
		var win = Ext.create('Youngshine.view.consult.New') 
		//Ext.widget('consult-new');
		var store = Ext.create('Ext.data.Store', {
		     fields: ['subjectID','subjectName'],
		     proxy: {
		         type: 'jsonp',
		         url: '',
		         reader: {
		             type: 'json',
		             root: 'data'
		         }
		     },
		     autoLoad: false
		});
		store.getProxy().url = this.getApplication().dataUrl + 'readSubjectList.php'
		store.load({
			callback: function(records, operation, success) {
				console.log(records);
				win.down('combo[name=subjectID]').store = store
			},
			scope: this
		});
    },
	consultnewSave: function(obj,win){ //obj用户信息
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在保存',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.data.JsonP.request({
            url: this.getApplication().dataUrl + 'createConsult.php',
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
				Ext.MessageBox.hide(); console.log(result)
				if(result.success){
					//Ext.getStore('Student').load(); //数据重新加载，最新添加的在前面
					obj.studentID = result.data.studentID; // model数组添加项目
					obj.created = '刚刚刚刚'
					Ext.getStore('Consult').insert(0,obj); //新增记录，排在最前面
					win.close(); //成功保存才关闭窗口
				}else{		
					Ext.Msg.alert('提示',result.message);
				}	
			},
			failure: function(result){
				Ext.MessageBox.hide();
				Ext.Msg.alert('网络错误','服务请求失败');
			}
        });
	},		
    consultEdit: function(record) {
		var win = Ext.create('Youngshine.view.consult.Edit') 
		//Ext.widget('consult-edit');
        win.down('form').loadRecord(record); //binding data		 
    },
	consulteditSave: function(obj,oldWin){ //obj用户信息
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在保存...',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.Ajax.request({
            url: this.getApplication().dataUrl + 'updateConsult.php',
            //callbackKey: 'callback',
            params: obj,
            success: function(res){
				Ext.MessageBox.hide();
				var ret = JSON.parse(res.responseText)
				console.log(ret)
				if(ret.success){
					// 更新前端store
					var model = oldWin.down('form').getRecord();
					model.set(obj) 
					
					oldWin.close();
				}else{	
					Ext.Msg.alert('提示',ret.message);
				}	
			},
        });
	},
	consultDelete: function(record){
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在删除...',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		console.log(record)
		Ext.data.JsonP.request({
			// 删除服务端记录: 最好做个标记，别真正删除？或者过期的和定期的不能删除？
			url: this.getApplication().dataUrl + 'deleteConsult.php',
			callbackKey: 'callback',
			params:{
				data: '{"consultID":' + record.data.consultID + '}'
			},
			success: function(result){
				Ext.MessageBox.hide();
				if(result.success){
					// 服务端删除成功后，客户端store当前记录同时删除，列表list才能相应显示 
					var store = Ext.getStore('Consult'); //移除本地store记录
					store.remove(record); //.removeAt(i); 
				}else{
					Ext.Msg.alert('提示',result.message);
				}
			},
			failure: function(){
				Ext.MessageBox.hide();
				Ext.Msg.alert('网络错误','服务请求失败');
			}
		});	
	},	
	
	consultChief: function(obj){
		var me = this; console.log(obj)
		
		Ext.MessageBox.show({
		   msg: '正在更新...',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.Ajax.request({
            url: Youngshine.getApplication().dataUrl + 'updateConsultByChief.php',
            //callbackKey: 'callback',
            params: obj,
            success: function(res){
				Ext.MessageBox.hide();
				var ret = JSON.parse(res.responseText)
				console.log(ret)
				if(ret.success){
					// 更新前端store
					//var model = oldWin.down('form').getRecord();
					//model.set(obj) 
					//record.set({"isChief": 1})
					//oldWin.close();
				}else{	
					Ext.Msg.alert('提示',ret.message);
				}	
			},
        });
	},	
});