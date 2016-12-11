Ext.define('Youngshine.controller.Student', {
    extend: 'Ext.app.Controller',

    views: [
        //'admin.List', //equal to required
    ],
	
	//stores: ['Student'],

    refs: [{
		ref: 'studentlist',
		selector: 'student-list'	
	}],

    init: function() {
        this.control({
            'student-list': {
				//studyhist: this.studentStudyhist,//报读历史记录
				//prepaid: this.studentPrepaid,//缴费历史记录
				//followup: this.studentFollowup,
				accntdetail: this.studentAccntdetail
            },	
			'student-hour': {
				search: this.studenthourSearch //学生课时消耗
			},		
        });
    },

	// 学生信息，包括添加删除排课以及历史报读课程，show跳转来自main controller
	showStudent: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.student.List')
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID')
		}
        var url = this.getApplication().dataUrl + 
			'readStudentList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Student');
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
	
	// 学生课时消耗统计，show跳转来自main controller
	showHour: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.student.Hour');
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
	
	// 购买的课程列表，方便查看一对多课程的消耗课时
	studentAccntdetail: function(record){
		var me = this;
		var win = Ext.create('Youngshine.view.student.AccntDetail')

		var obj = {
			"studentID": record.get('studentID')
		}
	    var url = me.getApplication().dataUrl + 
			'readAccntDetailByStudent.php?data=' + JSON.stringify(obj);
	    var store = Ext.getStore('AccntDetail');
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
	
	// 当前学生的报读历史课程
    studentStudyhist: function(rec) {
		var me = this;
		var win = Ext.create('Youngshine.view.student.Study', {
			record: rec // 父表传递参数，当前学生记录
		}); 
		//win.down('panel[itemId=info]').update(record.data);
		//win.setTitle( '报读知识点');

		// 获取当前委托单的检测项目
		var obj = {
			"studentID": rec.data.studentID,
			//"prepaid"  : 1 //已经缴费，不再可编辑
		};
		var store = Ext.getStore('Study'); 
		store.removeAll();
		store.clearFilter();
        var url = this.getApplication().dataUrl + 
			'readStudyListByHist.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
		        if (success){
					var sum = me.getApplication().getController('Study').sumFee();; // 合计公用函数
					win.down('displayfield[itemId=subtotal]').setValue(sum); 
				};
            },
            scope: this
        }); 
    },
	// 沟通记录
    studentFollowup: function(rec) {
		var me = this;
		var win = Ext.create('Youngshine.view.student.Followup', 
			{record: rec
		}); 
		var obj = {
			"studentID": rec.data.studentID,
		};
		var store = Ext.getStore('Followup'); 
		store.removeAll();
        var url = this.getApplication().dataUrl + 
			'readFollowupListByStudent.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
		        if (success){
					//var sum = me.sumAmt();; // 合计应收
					//win.down('displayfield[itemId=subtotal]').setValue(sum); 
				};
            },
            scope: this
        }); 
    },		
	
	//学生课时消耗
    studenthourSearch: function(obj,win) {
		var store = Ext.getStore('Course'); 
		store.removeAll();
		
		var url 
		if(obj.kcType=='大小班'){
			url = 'readHoursByClass.php?data=' + JSON.stringify(obj);
		}else{
			url = 'readHoursByOne2n.php?data=' + JSON.stringify(obj);
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
	
	// 表格合计公用函数
	sumAmt: function(){
		var sum = 0; //合计费用
		var store = Ext.getStore('Prepaid')
		store.each(function(record){
			sum += parseInt(record.get('amount'));
		})
		return sum;
	},	
});