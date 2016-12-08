Ext.define('Youngshine.view.student.List' ,{
    //extend: 'Ext.grid.Panel',
	extend: 'Ext.window.Window',
    alias : 'widget.student-list',

	closable: true,
	modal: true,
    autoShow: true,
	//resizable: false,
	maximizable: true,
	maximized: true,
	width: 850,
	height: 600,
	layout: 'fit',

    title : '学生列表',

	fbar: [{
		xtype: 'combo',
		width: 100,
		itemId: 'grade',
		store: {
			fields: ['value'],
			data : [
				{"value":"幼儿园"},
				{"value":"一年级"},
				{"value":"二年级"},
				{"value":"三年级"},
				{"value":"四年级"},
				{"value":"五年级"},
				{"value":"六年级"},
				{"value":"七年级"},
				{"value":"八年级"},
				{"value":"九年级"},
				{"value":"高一年"},
				{"value":"高二年"},
				{"value":"高三年"},
			]
		},
		valueField: 'value',
		displayField: 'value',
		emptyText: '年级',
		//editable: false,
		//padding: '5 0',
		listeners: {
			change: function(cb,newValue){
				var grade = newValue,
					studentName = this.up('window').down('textfield[itemId=search]').getValue().trim();
				this.up('window').onFilter(grade,studentName); 
			}
		}
	},{
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

	},'->',{	
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
	         width: 50,
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
	         text: '住址',
	         width: 100,
			 menuDisabled: true,
	         dataIndex: 'addr'
	     }, {
	         text: '备注',
	         width: 100,
			 menuDisabled: true,
	         dataIndex: 'note'
	     }, {
	         text: '分校区',
	         width: 120,
			 menuDisabled: true,
	         dataIndex: 'schoolsub',
	         //align: 'right',
	         //renderer: Ext.util.Format.usMoney	
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
				icon: 'resources/images/my_qrcode_icon.png',
				tooltip: '扫码绑定',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onQrcode(rec); 
				}	
			}]	
		},{	 
			menuDisabled: true,
			sortable: false,
			xtype: 'actioncolumn',
			width: 30,
			items: [{
				//iconCls: 'add',
				icon: 'resources/images/my_kclist_icon.png',
				tooltip: '课程明细',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAccntDetail(rec); 
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
				tooltip: '缴费记录',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
					grid.up('window').onAccntFee(rec); 
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
				tooltip: '排课',
				handler: function(grid, rowIndex, colIndex) {
					grid.getSelectionModel().select(rowIndex); // 高亮
					var rec = grid.getStore().getAt(rowIndex);
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

	onFilter: function(grade,studentName){
		var me = this;
		var studentName = new RegExp("/*" + studentName); // 正则表达式
		var store = this.down('grid').getStore();
		store.clearFilter(); // filter is additive
		if(grade != null )
			store.filter([
				{property: "grade", value: grade},
				{property: "fullStudent", value: studentName}, // 姓名模糊查找？？
			]);
		if(grade == null )
			store.filter("fullStudent", studentName);
	},
		
	// 咨询师与学生沟通记录
	onFollowup: function(rec){ 
		this.fireEvent('followup',rec);
	},	

	// qrcode
	onQrcode: function(record){ 
		//this.fireEvent('qrcode',record);
		Ext.Ajax.request({
		    url: 'script/weixinJS_gongzhonghao/wx_qrcode.php',
		    params: {
				studentID: record.data.studentID
		    },
		    success: function(response){
				var ret = JSON.parse(response.responseText)
				console.log(ret)
				
				Ext.Msg.show({
				     title: '微信扫码绑定账号｜'+ record.data.studentName,
				     msg: '<img height=220 src=' + ret.img + ' />',
				     buttons: Ext.Msg.OK,
				     //icon: Ext.Msg.QUESTION
				});
		    }
		});	
	},

	// 缴费的子表明细：课程
	onAccntDetail: function(record){
		var me = this;
		me.fireEvent('accntdetail',record);
		return;
//		
		var obj = {
			"studentID": record.get('studentID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readAccntDetailByStudent.php', 
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
						title += (i+1) + '、' + arr[i].title + '：' + 
							arr[i].hour+'课时'+ arr[i].amount+'元' + '<br>';
					Ext.MessageBox.alert('课程明细',title)
                }
            },
        });
	},
	
	// 缴款记录
	onAccntFee: function(record){
		var obj = {
			"studentID": record.get('studentID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readAccntFeeByStudent.php', 
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
						title += (i+1) + '、' + arr[i].feeDate + arr[i].payment + 
							'：' + arr[i].amount+'元' + '<br>';
					Ext.MessageBox.alert('缴款记录',title)
                }
            },
        });
	},
		
	// 排课：大小班，一对一
	onKcb: function(record){ 
		//this.fireEvent('kcb',record);
		var obj = {
			"studentID": record.get('studentID')
		}
		console.log(obj)
        Ext.data.JsonP.request({
            url: Youngshine.app.getApplication().dataUrl + 'readKcbByStudent.php', 
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
					
					// 上课时间列表分解成单一
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
						//console.log(weekday)
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
	
});