// 统计教师上课课时
Ext.define('Youngshine.view.teacher.Course' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.teacher-course',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 750,
	height: 550,
	layout: 'fit',

    title : '教师课时统计',

	tbar: [{
		padding: '5,0',
		xtype: 'combo',
		width: 200,
		//fieldLabel: '教师',
		//labelWidth: 45,
		//labelAlign: 'right',
		itemId: 'teacher',
		store: 'Teacher',
		valueField: 'teacherID',
		displayField: 'teacherName',
		//value: '全部分校区',
		emptyText: '选择教师',
		editable: false,
		listConfig: {
            itemTpl: '{teacherName} - {subjectName}{phone}'
        },	
		queryMode: 'local'	
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
				{"value":"一对一"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		editable: false,
		//padding: '5 0',
	},{	
		//padding: '5,0',
		xtype: 'datefield',
		name: 'startdate',
		fieldLabel: '日期范围',
		labelWidth: 55,
		labelAlign: 'right',
		format: 'Y-m-d',
		//value: new Date('2014-01-01'),
        value: new Date(),
        width: 155, 
        emptyText: '开始日期',
        allowBlank: false
    },{
        xtype: 'datefield',
		name: 'enddate',
		format: 'Y-m-d',
		value: new Date(),
        //fieldLabel: '至',
        width: 100,
        //margins: '0 0 0 6',
        emptyText: '结束日期',
        allowBlank: false	
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
		xtype: 'button',
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
			 text: '日期',
	         width: 80,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'fullDate'
	     }, {
			 text: '课时',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'hour',
			 align: 'center'
	     }, {
			 text: '班级或课程内容',
	         flex: 1,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'title'
	     }, {
			 text: '类型',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'kcType'
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_right_icon.png',
				//tooltip: '测评内容',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onRollup(rec); 
				}	
			}]			 		 
	     }], 
		 
   	 	listeners: {
   	 		itemdblclick: function (view, record, row, i, e) {
   	 			this.up('window').onTopic(record);
   	 		},
   	 	},      
	}],

	onSearch: function(){ 
		var me = this;
		var start = this.down('datefield[name=startdate]').getValue(),
			end = this.down('datefield[name=enddate]').value//.toLocaleDateString() 
			// 0点0分，不准确，要转换toLocal
		//end = new Date().format('yyyy-mm-dd')
		/*var user_id = this.down('combo[name=user_id]').getValue()
		if(user_id == null){
			user_id = 0
		} */
		var kcType = this.down('combo[itemId=kcType]').getValue(),
			teacherID = this.down('combo[itemId=teacher]').getValue();

		if(teacherID == null){
			Ext.Msg.alert('提示','请选择教师');
			return;
		}
		if(kcType == null){
			//kcType = ''  // 空白''，代表全部
			Ext.Msg.alert('提示','请选择课程类型（大小班、一对一）');
			return;
		}

		var obj = {
			start: start,
			end: end,
			kcType: kcType,
			teacherID: teacherID,
			schoolID: localStorage.schoolID // 当前学校
		}
		console.log(obj)
		this.fireEvent('search',obj,me);
	},	
	
	// 点名表
	onRollup: function(record){
		var me = this
		
		var obj = {
			beginDate: record.data.fullDate,
			title: record.data.title,
			kcType: record.data.kcType,
			teacherID: me.down('combo[itemId=teacher]').getValue()
		}
		console.log(obj)
		
		if(obj.kcType=='大小班'){
			url = Youngshine.app.getApplication().dataUrl + 'readCourseStudentByClass.php'
		}else{
			url = Youngshine.app.getApplication().dataUrl + 'readCourseStudentByOne2one.php'
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
});