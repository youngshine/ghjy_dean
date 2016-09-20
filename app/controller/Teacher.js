Ext.define('Youngshine.controller.Teacher', {
    extend: 'Ext.app.Controller',

    views: [
        //'admin.List', //equal to required
    ],
	
	//stores: ['Student'],

    refs: [{
		ref: 'teacherlist',
		selector: 'teacher-list'
	}],

    init: function() {
        this.control({
            'teacher-list': {
				//addnew: this.teacherNew,
				
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
});