// 统计学生课时消耗
Ext.define('Youngshine.view.student.Hour' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.student-hour',
	
	id: 'winStudentHour',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 700,
	height: 500,
	layout: 'fit',
	defaultFocus: 'teacher',

    title : '学生课时消耗统计',

	tbar: [{
		padding: '5,0',
		xtype: 'textfield',
		name : 'studentName',
		fieldLabel: '学生姓名',
		labelWidth: 55,
		labelAlign: 'right',
		readOnly: true,
		emptyText: '全校范围选择',
		listeners: {
	        click: {
	            element: 'el', 
	            fn: function(e,opts){ 					
					//Ext.getCmp('winAccntNew').onStudent(e,opts)
					Ext.getCmp('winStudentHour').onStudent(e,opts)
				},
	        },	
	    },	
	},{
		xtype: 'hiddenfield',
		name : 'studentID',
	},{	
		xtype: 'combo',
		width: 140,
		fieldLabel: '课程类型',
		labelWidth: 55,
		//emptyText: '课程类型',
		labelAlign: 'right',
		itemId: 'kcType',
		store: {
			fields: ['value'],
			data : [
				{"value":"大小班"},
				{"value":"一对N"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		editable: false,
		//padding: '5 0',

	},'-',{
		xtype: 'button',
		text: '查找',
		width: 80,	
		scope: this,
		handler: function(btn){
			btn.up('window').onSearch();
		},
		style: {
			//background: 'transparent',
			border: '1px solid #bbb'
		},
	}],
	fbar: [{
		xtype: 'label',
		html: '合计（课时）:',
	},{
		xtype: 'displayfield',
		itemId: 'subtotal',
		value: 0,
	},'->',{	
		xtype: 'button', hidden: true,
		text: '导出Excel',
		//scale: 'medium',
		//width: 55,
		handler: function(btn){
			btn.up('window').onExcel()
		}
	},{	
		xtype: 'button',
		text: '关闭',
		//scale: 'medium',
		width: 55,
		style: {
			//background: 'transparent',
			border: 1 //'1px solid #fff'
		},
		handler: function(btn){
			btn.up('window').close()
		}
	}],
	
	items: [{
		xtype: 'grid',
		stripeRows: true,
		store: 'Course',
	    columns: [{
			xtype: 'rownumberer',
			width: 35
		},{	  
			 text: '课程名称',
	         flex: 1,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'kcTitle'
	     }, {
			 text: '课时',
	         width: 40,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'hour',
			 align: 'center'
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_right_icon.png',
				tooltip: '明细',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onDetail(rec); 
				}	
			}]			 		 
	     }], 
		 
   	 	listeners: {
   	 		itemdblclick: function (view, record, row, i, e) {
   	 			//this.up('window').onTopic(record);
   	 		},
   	 	},      
	}],

	onSearch: function(){ 
		var me = this;

		var kcType = this.down('combo[itemId=kcType]').getValue(),
			studentID = this.down('hiddenfield[name=studentID]').getValue();

		if(studentID == ''){
			Ext.Msg.alert('提示','请选择学生');
			return;
		}
		if(kcType == null){
			//kcType = ''  // 空白''，代表全部
			Ext.Msg.alert('提示','请选择类型（大小班、一对一）');
			return;
		}

		var obj = {
			kcType: kcType,
			studentID: studentID,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		this.fireEvent('search',obj,me);
	},	
	

	// 日期明细
	onDetail: function(record){
		var me = this
		
		var obj = {
			//beginDate: record.data.fullDate,
			//title: record.data.title,
			kcType: record.data.kcType,
			//teacherID: me.down('combo[itemId=teacher]').getValue()
			courseNo: record.data.courseNo,
		}
		console.log(obj)
		
		if(obj.kcType=='大小班'){
			url = Youngshine.app.getApplication().dataUrl + 'readCourseStudentByClass.php'
		}else{
			url = Youngshine.app.getApplication().dataUrl + 'readCourseStudentByOne2n.php'
		}
		
		Ext.Ajax.request({
			url: url,
			params: obj,
			success: function(response){
				var ret = JSON.parse(response.responseText)
				var students = ''
				Ext.Array.each(ret.data, function(name, index, countriesItSelf) {
				    console.log(name);
					//student.push(name)
					students += name.studentName + '：' + 
						(name.flag==1 ? '✔' : (name.flag==2 ? '✔迟到': '旷课' ) ) + '<br>'
				});
				
				Ext.Msg.show({
				     title: '点名表',
				     msg: students,
				     buttons: Ext.Msg.OK,
				     //icon: Ext.Msg.QUESTION
				});
			},
		});	
	},
	
	// 查找选择全校学生
	onStudent: function(e,input){
		console.log(input)
		var me = this
		var win = Ext.create('Youngshine.view.student.StudentFind'); 
		win.parentView = me;
		win.showAt(e.getXY())  
		//win.show()
		// 带入参数：当前js textfield，返回值显示
		win.input = input;  
		win.down('grid').getStore().removeAll()
		
		// 分校区
		var obj = {
			"schoolID": localStorage.getItem('schoolID'),
		} 
		var store = Ext.getStore('Schoolsub'); 
		store.removeAll();
		store.clearFilter();
        var url = Youngshine.app.getApplication().dataUrl + 
			'readSchoolsubList.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {

            },
            scope: this
        });
	},
});