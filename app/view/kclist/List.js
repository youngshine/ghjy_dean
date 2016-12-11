// 待排课课程（学生知识点）
Ext.define('Youngshine.view.kclist.List' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.kclist',
	
    requires:[
		//'Youngshine.view.study.Zsd',
    ],

	autoShow: true,
	closable: true,
	modal: true,
	//resizable: false,
	width: 700,
	height: 500,
	layout: 'fit',

    title : '课程',
	
	//record: null, // 父表参数传递，该学生信息

	fbar: [{	
		xtype: 'combo',
		width: 100,
		//fieldLabel: '课程类型',
		//labelWidth: 55,
		emptyText: '课程类型',
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
		listeners: {
			change: function(cb,newValue){
				var val = newValue
				this.up('window').onFilter(val); 
			}
		}
	},'->',{
		xtype: 'button',
		text: '＋新增',
		width: 65,
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
		}
	}],
	
	items: [{
		xtype: 'grid',
		stripeRows: true,
		store: 'Kclist',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	
	         text: '课程名称',
	         flex: 1,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'title'
	     }, {
			 text: '类型',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'kcType'
	     }, {
	         text: '学科',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'subjectName' 
	     }, {
	         text: '年级',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'gradeName'
	     }, {
	         text: '单价',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'unitprice',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value + '元/时';
		     }
	     }, {
	         text: '课时',
	         width: 40,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'hour',
			 align: 'center',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }	 
	     }, {
	         text: '金额',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'amount',
			 align: 'right',
			 renderer: function(value){
		         if (value == 0) {
		             return '';
		         }
		         return value;
		     }
   		},{	 
   			menuDisabled: true,
   			sortable: false,
   			xtype: 'actioncolumn',
   			width: 30,
   			items: [{
   				//iconCls: 'add',
   				icon: 'resources/images/my_team_icon.png',
   				tooltip: '班级',
   				handler: function(grid, rowIndex, colIndex) {
   					grid.getSelectionModel().select(rowIndex); // highlight showing selected
   					var rec = grid.getStore().getAt(rowIndex);
   					grid.up('window').onClasses(rec); 
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
 					grid.getSelectionModel().select(rowIndex); // 高亮
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
	
	onFilter: function(val){
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		store.filter("kcType", val);
	},
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
	
	// 课程开办几个班级？
	onClasses: function(record){
		var obj = {
			"kclistID": record.get('kclistID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readClassesListByKclist.php', 
            callbackKey: 'callback',
            params:{
                data: JSON.stringify(obj)
            },
            success: function(result){
                if(result.success){
					console.log(result.data)
					var arr = result.data,
						title = ''
					for(var i=0;i<arr.length;i++)
						title += (i+1) + '、' + arr[i].title + 
							'：' + arr[i].enroll +' / '+ arr[i].persons +'<br>';
					Ext.MessageBox.alert('开设班级',title)
                }
            },
        });
	},
});