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
	         text: '名称',
	         width: 150,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'title'
	     }, {
			 text: '课程类型',
	         width: 60,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'kcType'
	     }, {
	         text: '科目',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'kmType' 
	     }, {
	         text: '学段',
	         width: 60,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'sectionName'
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
	     }, {
	         text: '备注',
	         flex: 1,
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
	
	onFilter: function(val){
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		store.filter("kcType", val);
	},
	onNew: function(){ 
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
	}
});