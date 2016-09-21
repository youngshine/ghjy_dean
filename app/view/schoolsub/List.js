// 分校区
Ext.define('Youngshine.view.schoolsub.List' ,{
	extend: 'Ext.window.Window',
    alias : 'widget.schoolsub',

	autoShow: true,
	closable: true,
	modal: true,
	//resizable: false,
	width: 700,
	height: 500,
	maximizable: true,
	layout: 'fit',

    title : '分校区',
	
	fbar: ['->',{
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
		store: 'Schoolsub',
	    columns: [{
			xtype: 'rownumberer',
		},{	
	         text: '分校区名称',
			 flex: 1,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'fullname'
	     }, {
			 text: '地址',
	         width: 200,
	         sortable: true,
			 menuDisabled: true,
	         dataIndex: 'addr'
	     }, {
	         text: '电话',
	         width: 150,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'phone' 
	     }, {
	         text: '联系人',
	         width: 100,
	         //sortable: false,
			 menuDisabled: true,
	         dataIndex: 'contact',
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
	     }],     
	}],

});