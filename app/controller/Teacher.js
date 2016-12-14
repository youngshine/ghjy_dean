Ext.define('Youngshine.controller.Teacher', {
    extend: 'Ext.app.Controller',

    views: [
        //'admin.List', //equal to required
    ],
	
	//stores: ['Student'],

    refs: [{
		ref: 'teacherlist',
		selector: 'teacher-list'
    },{
		ref: 'teachernew',
		selector: 'teacher-new'
	},{
		ref: 'teacheredit',
		selector: 'teacher-edit'
	},{
		ref: 'teachercourse',
		selector: 'teacher-course'	
	}],

    init: function() {
        this.control({
            'teacher-list': {
				addnew: this.teacherNew,
				edit: this.teacherEdit, //自定义事件 user...
				del: this.teacherDelete,
            },
			'teacher-edit': {
				save: this.teachereditSave, 
            },
			'teacher-new': {
                save: this.teachernewSave,
            },
			// 教师上课课时
			'teacher-course': {
				search: this.teachercourseSearch,
				assess: this.teachercourseAssess,
			},					
        });
    },

	// 教师信息，包括添加删除排课以及历史报读课程，show跳转来自main controller
	showTeacher: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.teacher.List') //Ext.widget('student-list');
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID')
		}
        var url = this.getApplication().dataUrl + 
			'readTeacherList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Teacher');
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
	
    teacherNew: function(button) {
		var win = Ext.create('Youngshine.view.teacher.New') 
		//Ext.widget('teacher-new');
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
	
	teachernewSave: function(obj,win){ //obj用户信息
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在保存',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.Ajax.request({
            url: this.getApplication().dataUrl + 'createTeacher.php',
            //callbackKey: 'callback',
            params: obj,
            success: function(res){
				Ext.MessageBox.hide();
				var ret = JSON.parse(res.responseText)
				console.log(ret)
				if(ret.success){
					//Ext.getStore('Consult').load(); 
					//数据重新加载，最新添加id的在前面???
					obj.teacherID = ret.data.teacherID; // model数组添加项目
					obj.position = '教师'
					//obj.created = '刚刚刚刚'
					Ext.getStore('Teacher').insert(0,obj); //新增记录，排在最前面
					win.close(); //成功保存才关闭窗口
					
					// 企业号通讯录添加，包括标签tag
					doAdd2contact(obj)
				}else{		
					Ext.Msg.alert('提示',ret.message);
				}	
			},
			failure: function(result){
				Ext.MessageBox.hide();
				Ext.Msg.alert('网络错误','服务请求失败');
			}
        });
		
		// 2. 成功后，企业号通讯录新增人员，如果重复？咋办？？
		function doAdd2contact(obj){
			console.log(obj)
			Ext.Ajax.request({
				url: 'script/weixinJS/wx_user_create.php',
				params: obj,
				success: function(response){	
	                console.log(response)
					var text = response.responseText;
					console.log(text)
					
					//toast('添加教师到通讯录成功') //数据库和通讯录都添加
					doAddtag(obj.userId)
				},
			});
		}
		
		// 3. 添加企业号通讯录成功后，设置标签（咨询2、教师3、分校长6）
		function doAddtag(userId){
			Ext.Ajax.request({
				url: 'script/weixinJS/wx_user_addtag.php',
			    params: {
			        userId: userId,
					tagId : 3 // 咨询标签 2
			    },
				success: function(response){	
	                var text = response.responseText;
					// process server response here
					//wxMsgText(userId,'您被分配了分校长权限')
					console.log(text)
					
					Ext.Msg.alert('提示','添加教师成功') 
					//数据库和通讯录都添加，出错的事务回滚？？
				},
			});
		}
	},	
		
    teacherEdit: function(record) {
		var win = Ext.create('Youngshine.view.teacher.Edit') 
		//Ext.widget('teacher-edit');
        win.down('form').loadRecord(record); //binding data
		
		/*
		// 学科subject 临时store
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
		 */

        var store = Ext.getStore('Subject');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = this.getApplication().dataUrl + 'readSubjectList.php'
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });
    },
	teachereditSave: function(obj,oldWin){ //obj用户信息
		var me = this;
		Ext.MessageBox.show({
		   msg: '正在保存...',
		   width: 300,
		   wait: true,
		   waitConfig: {interval:200},
		});
		Ext.data.JsonP.request({
            url: this.getApplication().dataUrl + 'updateTeacher.php',
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
				Ext.MessageBox.hide();
				if(result.success){
					//Ext.getStore('Student').load(); //如何不重载，更新本地store当前记录？？？
					
					// 更新前端store
					var model = oldWin.down('form').getRecord();
					model.set(obj) 
					
					oldWin.close();
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
	teacherDelete: function(record){
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
			url: this.getApplication().dataUrl + 'deleteTeacher.php',
			callbackKey: 'callback',
			params:{
				data: '{"teacherID":' + record.data.teacherID + '}'
			},
			success: function(result){
				Ext.MessageBox.hide();
				if(result.success){
					// 服务端删除成功后，客户端store当前记录同时删除，列表list才能相应显示 
					var store = Ext.getStore('Teacher'); //移除本地store记录
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
	
	// 教师课时统计，show跳转来自main controller
	showTeacherCourse: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.teacher.Course');
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID'),
		}
	    var url = this.getApplication().dataUrl + 
			'readTeacherList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Teacher');
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
	
    teachercourseSearch: function(obj,win) {
		var store = Ext.getStore('Course'); 
		store.removeAll();
		
		var url 
		if(obj.kcType=='大小班'){
			url = 'readCourseListByClass.php?data=' + JSON.stringify(obj);
		}else{
			url = 'readCourseListByOne2n.php?data=' + JSON.stringify(obj);
		}
		url = this.getApplication().dataUrl + url
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
				var total = 0
				store.each(function(record){
					total += parseInt(record.data.hour)
				})
				win.down('displayfield[itemId=subtotal]').setValue(total)
            },
            scope: this
        });
    },	
	
	// 课时出勤学生及其家长评价（一对多才有评价？）
	teachercourseAssess: function(record){
		var me = this;
		var win = Ext.create('Youngshine.view.teacher.CourseAssess')

		var obj = {
			"courseNo": record.get('courseNo'),
			"kcType": record.get('kcType'),
		}
		console.log(obj)
		
		var url = ''
		if(obj.kcType=='大小班'){
			url = me.getApplication().dataUrl + 'readCourseStudentByClass.php?data=' + JSON.stringify(obj);
		}else{
			url = me.getApplication().dataUrl + 'readCourseStudentByOne2n.php?data=' + JSON.stringify(obj);
		}
		
	    //var url = me.getApplication().dataUrl + 'readAccntDetailByStudent.php?data=' + JSON.stringify(obj);
	    var store = Ext.getStore('CourseAssess');
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
});