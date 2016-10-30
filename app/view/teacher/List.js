Ext.define('Youngshine.view.teacher.List' ,{
    //extend: 'Ext.grid.Panel',
	extend: 'Ext.window.Window',
    alias : 'widget.teacher-list',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	width: 800,
	height: 550,
	layout: 'fit',

    title : '教师列表',
	
	fbar: [{
		xtype: 'textfield',
		itemId : 'search',
		width: 100,
		//fieldLabel: '筛选',
		//labelWidth: 30,
		//labelAlign: 'right',
		emptyText: '搜索...',
		enableKeyEvents: true,
		listeners: {
			keypress: function(field,e){
				console.log(e.getKey())
				if(e.getKey()=='13'){ //按Enter
					field.up('window').onFilter(field.value); 
				}	
			}
		}

	},'->',{
		xtype: 'button', disabled: true,
		text: '＋新增',
		width: 65,
	    handler: function(btn){
			btn.up('window').onNew(); //onAdd是系统保留reserved word
	    }
	},{
		xtype: 'button',
		text: '关闭',
		width: 65,
	    handler: function(btn){
			btn.up('window').close();
	    }
	}],

	items: [{
		xtype: 'grid',
		stripeRows: true,
		store: 'Teacher',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	
			 text: '姓名',
	         width: 100,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'teacherName'
	     }, {
			 text: '性别',
	         width: 35,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'gender'
	     }, {
			 text: '电话',
	         width: 100,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'phone'
	     }, {
	         text: '学科',
	         width: 50,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'subjectName'
	     }, {
	         text: '备注',
	         width: 150,
	         sortable: false,
			 menuDisabled: true,
	         dataIndex: 'note'
	     }, {
	         text: '一对N上课时间',
	         flex: 1,
	         sortable: false,
			 menuDisabled: true,
	         dataIndex: 'timely_list_one2n'

  		},{	 
  			menuDisabled: true,
  			sortable: false,
  			xtype: 'actioncolumn',
  			width: 30,
  			items: [{
  				//iconCls: 'add',
  				icon: 'resources/images/my_user_icon.png',
  				tooltip: '一对N上课时间设定',
  				handler: function(grid, rowIndex, colIndex) {
  					grid.getSelectionModel().select(rowIndex); // 高亮
  					var rec = grid.getStore().getAt(rowIndex);
  					//Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
  					//me.fireEvent('adminEdit');
  					grid.up('window').onOne2nKcb(rec); 
  				}	
  			}]			 
 		},{	 
 			menuDisabled: true,
 			sortable: false,
 			xtype: 'actioncolumn',
 			width: 30,
 			items: [{
 				//iconCls: 'add',
 				icon: 'resources/images/my_timely_icon.png',
 				tooltip: '课程表',
 				handler: function(grid, rowIndex, colIndex) {
 					grid.getSelectionModel().select(rowIndex); // 高亮
 					var rec = grid.getStore().getAt(rowIndex);
 					//Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
 					//me.fireEvent('adminEdit');
 					grid.up('window').onKcb(rec); 
 				}	
 			}]	
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
 					grid.getSelectionModel().select(rowIndex); // highlight showing selected
 					var rec = grid.getStore().getAt(rowIndex);
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
					//var me = this;
					var rec = grid.getStore().getAt(rowIndex);
					//Ext.Msg.alert('Sell', 'Sell ' + rec.get('company'));
					//Ext.Msg.confirm('提示','是否当前操作员？',function(btn){
					//	if(btn == 'yes'){
							//me.fireEvent('adminDelete');
							grid.up('window').onDelete(rec); 
					//	}
					//});
				}	
			}]				 		 
	     }],     
	}],
	
	listeners: {
		itemdblclick: function (view, record, row, i, e) {
			//this.up('mysearch').onItemdblclick(view, record, row, i, e);
			//this.fireEvent('editUser',view,record);
			this.onItemdblclick(view,record);
		},
		selectionchange: function(selModel, selections){
			this.onSelect(selModel, selections)
		}
	},

	/* 
	onItemdblclick: function(view,record){
		this.fireEvent('editUser',view,record);
	},
	onSelect: function(selModel, selections){
		//this.fireEvent('selectUser',selModel, selections);
		var delBut = this.down('button[action=delete]');
        delBut.setDisabled(false);
	}, */

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
	
	// 一对一上课时间，预先设定
	onOne2nKcb: function(record){
		var me = this;
		var win = Ext.create('Youngshine.view.teacher.One2nKcb');
		//win.down('form').loadRecord(record); //binding data
		win.parentRecord = record // 传递参数
		win.parentView = me 
		
		// 上课周期列表数组，list.store
		var timely_list = record.data.timely_list_one2n.trim()
		if(timely_list == ''){
			return false
		}
		timely_list = record.data.timely_list_one2n.split(',')
		console.log(timely_list)
		var timely = [];
		for (var i = 0; i < timely_list.length; i++) {
			//timely.push( {"timely":timely_list[i]}  )
			var w = timely_list[i].substr(0,2),
				h = timely_list[i].substr(2,2),
				m = timely_list[i].substr(5,2)
			timely.push( {"w":w,"h":h,"m":m}  )
		}
		console.log(timely);
		win.down('grid').getStore().loadData(timely)

	},
	
	onKcb: function(record){ 
		//this.fireEvent('kcb',record);
		var obj = {
			"teacherID": record.get('teacherID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readKcbByTeacher.php', 
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
                if(result.success){
					console.log(result.data)
					/*
					var arr = result.data,
						title = ''
					for(var i=0;i<arr.length;i++)
						title += (i+1) + '、' + arr[i].kcType + '：' + 
							arr[i].timely_list + '<br>';
					Ext.MessageBox.alert('排课',title)
					*/
					
					var arr = []
					result.data.forEach(function (item) {
						var timely_list = item.timely_list.split(',')
						Ext.Array.each(timely_list, function(timely, index, countriesItSelf) {
						    console.log(timely);
							arr.push(timely + '【'+item.kcType + '】' )  
						});
						//time = timely_list.concat(item.timely_list)
					});
					console.log(arr)
					
					var title = ''
					var weekdays = ['周一','周二','周三','周四','周五','周六','周日']
					Ext.Array.each(weekdays, function(weekday,index){     
						var grp = ''
						for(var i=0;i<arr.length;i++){
							if(arr[i].indexOf(weekday)>=0){
								if(grp != weekday){
									grp = weekday; console.log(i)
									if(title==''){
										title +=  grp + '：' + arr[i].substr(2) 
									}else{
										title +=  '<br>' + grp + '：' + arr[i].substr(2) 
									}
									
								}else{
									title +=  '、' + arr[i].substr(2) 
								}
								//title += '•' + arr[i] + '<br>';
							}
						}
					});
					
					Ext.MessageBox.alert('排课',title)
                }
            },
        });
	},
	
	onFilter: function(val){
		var me = this; 
		var value = new RegExp("/*" + val); // 正则表达式
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		store.filter("teacherName", value);
	}
});