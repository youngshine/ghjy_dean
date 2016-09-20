Ext.define('Youngshine.view.student.List' ,{
    //extend: 'Ext.grid.Panel',
	extend: 'Ext.window.Window',
    alias : 'widget.student-list',
	
    requires:[
		'Youngshine.view.student.New',
		'Youngshine.view.student.Edit',
		'Youngshine.view.student.Study', //历史记录
    ],

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '学生列表',

	fbar: [{
		xtype: 'textfield',
		itemId : 'search',
		width: 100,
		//fieldLabel: '筛选',
		//labelWidth: 30,
		//labelAlign: 'right',
		emptyText: '搜索姓名电话...',
		enableKeyEvents: true,
		listeners: {
			keypress: function(field,e){
				console.log(e.getKey())
				if(e.getKey()=='13'){ //按Enter
					var studentName = field.value,
						grade = field.up('window').down('combo[itemId=grade]').getValue();
					field.up('window').onFilter(grade,studentName); 
				}	
			}
		}
	},{		
		xtype: 'combo',
		width: 100,
		itemId: 'grade',
		store: {
			fields: ['value'],
			data : [
				{"value":"全部年级"},
				{"value":"一年级"},
				{"value":"二年级"},
				{"value":"三年级"},
				{"value":"四年级"},
				{"value":"五年级"},
				{"value":"六年级"},
				{"value":"七年级"},
				{"value":"八年级"},
				{"value":"九年级"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		value: '全部年级',
		editable: false,
		//padding: '5 0',
		listeners: {
			change: function(cb,newValue){
				var grade = newValue,
					studentName = this.up('window').down('textfield[itemId=search]').getValue().trim();
				this.up('window').onFilter(grade,studentName); 
			}
		}

	},'->',{	
		xtype: 'button',
		text: '＋新增',
		tooltip: '添加学生',
		//disabled: true,
		//scale: 'medium',
		width: 55,
		handler: function(btn){
			btn.up('window').onNew(); //onAdd是系统保留reserved word
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
			// non-modal window
			if(Ext.getCmp('winStudyHist')) Ext.getCmp('winStudyHist').destroy() 
			if(Ext.getCmp('winPrepaidHist')) Ext.getCmp('winPrepaidHist').destroy() 
		}
	}],
	
	items: [{
		xtype: 'grid',
		stripeRows: true,
		//allowDeselect: true,
		//selType: 'cellmodel',
		store: 'Student',
	    columns: [{
			xtype: 'rownumberer',
			width: 35
		},{	
			 text: '姓名',
			 flex: 1,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'studentName'
	     }, {
	         text: '性别',
	         width: 30,
			 menuDisabled: true,
	         dataIndex: 'gender'
	     }, {
	         text: '年级',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'grade'	 
	     }, {
	         text: '电话',
	         width: 100,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'phone'	
	     }, {
	         text: '所在地区',
	         width: 120,
			 menuDisabled: true,
	         dataIndex: 'district',
	         //align: 'right',
	         //renderer: Ext.util.Format.usMoney	
	     }, {
	         text: '住址',
	         width: 100,
			 menuDisabled: true,
	         dataIndex: 'addr'
	     }, {
	         text: '注册时间',
	         width: 70,
			 menuDisabled: true,
	         dataIndex: 'created',
			 renderer : function(val) {
                 return '<span style="color:' + '#73b51e' + ';">' + val.substr(2,8) + '</span>';
                 //return val;
             }, 
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_edit_icon.png',
				tooltip: '修改',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮当前选择行？？？不是自动？
					var rec = grid.getStore().getAt(rowIndex);
					//Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
					//me.fireEvent('adminEdit');
					grid.up('window').onEdit(rec); 
				}	
			}]	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_delete_icon.png',
				tooltip: '删除',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onDelete(rec); 
				}	
			}]	
			
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_input_icon.png',
				tooltip: '测评记录',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAssess(rec); 
				}	
			}]	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_pay_icon.png',
				tooltip: '购买明细',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onPrepaid(rec); 
				}	
			}]
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_zsd_icon.png',
				tooltip: '课程内容',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onStudyhist(rec); 
				}	
			}]	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_chat_icon.png',
				tooltip: '沟通记录',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onFollowup(rec); 
				}	
			}]	 		 
	     }],     
	}],
	
	onNew: function(){ 
		this.down('grid').getSelectionModel().deselectAll();
		this.fireEvent('addnew');
	},
	onEdit: function(rec){ 
		this.fireEvent('edit',rec);
	},
	onDelete: function(rec){
		var me = this;
		console.log(rec);
		Ext.Msg.confirm('提示','是否删除当前行？',function(btn){
			if(btn == 'yes'){
				me.fireEvent('del',rec);
			}
		});
	},

	// 咨询师与学生沟通记录
	onFollowup: function(rec){ 
		this.fireEvent('followup',rec);
	},	
	// 报读历史记录，不可编辑
	onStudyhist: function(rec){ 
		this.fireEvent('studyhist',rec);
	},
	// 缴费明细
	onPrepaid: function(rec){ 
		this.fireEvent('prepaid',rec);
	},
	// 测评
	onAssess: function(rec){ 
		this.fireEvent('assess',rec);
	},
	
	onFilter: function(grade,studentName){
		var me = this;
		var studentName = new RegExp("/*" + studentName); // 正则表达式
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		if(grade != '全部年级' )
			store.filter([
				{property: "grade", value: grade},
				{property: "fullStudent", value: studentName}, // 姓名模糊查找？？
			]);
		if(grade == '全部年级' )
			store.filter("fullStudent", studentName);
	}
});