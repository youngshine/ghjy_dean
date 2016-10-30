Ext.define('Youngshine.view.consult.List' ,{
    //extend: 'Ext.grid.Panel',
	extend: 'Ext.window.Window',
    alias : 'widget.consult-list',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	width: 700,
	height: 450,
	layout: 'fit',

    title : '咨询师列表',
	
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
		store: 'Consult',
	    columns: [{
			xtype: 'rownumberer',
			width: 30
		},{	
			 text: '姓名',
	         width: 100,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'consultName'
	     }, {
			 text: '性别',
	         width: 35,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'gender',
			 align: 'center'
	     }, {
			 text: '电话',
	         width: 100,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'phone'
	     }, {
	         text: '分校区',
	         flex: 1,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'schoolsub'
	     }, {
	         text: '备注',
	         width: 100,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'note'
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
	
	onFilter: function(val){
		var me = this; 
		var value = new RegExp("/*" + val); // 正则表达式
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		store.filter("teacherName", value);
	}
});