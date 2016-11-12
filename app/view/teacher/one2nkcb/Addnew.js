Ext.define('Youngshine.view.teacher.one2nkcb.Addnew', {
    extend: 'Ext.window.Window',
    alias : 'widget.one2nkcb-addnew',

    title : '添加上课时间',
    //layout: 'fit',
	
	width: 300,
	//height: 300,
	modal: true,
    autoShow: true,
	resizable: false,
	closable: false,
	
	parentRecord: null,
	parentView: null,
	
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		fieldDefaults: {
			labelWidth: 80,
			labelAlign: 'right',
			anchor: '100%'
		},
		items: [{
			xtype: 'combo',
			name: 'w',
			store: {
				fields: ['value'],
				data : [
					{"value":"周一"},
					{"value":"周二"},
					{"value":"周三"},
					{"value":"周四"},
					{"value":"周五"},
					{"value":"周六"},
					{"value":"周日"},
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '星期'
		},{
			xtype: 'combo',
			name: 'h',
			store: {
				fields: ['value'],
				data : [
					{"value":"08"},
					{"value":"09"},
					{"value":"10"},
					{"value":"11"},
					{"value":"12"},
					{"value":"13"},
					{"value":"14"},
					{"value":"15"},
					{"value":"16"},
					{"value":"17"},
					{"value":"18"},
					{"value":"19"},
					{"value":"20"},
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '时'
		},{
			xtype: 'combo',
			name: 'm',
			store: {
				fields: ['value'],
				data : [
					{"value":"00"},
					{"value":"05"},
					{"value":"10"},
					{"value":"15"},
					{"value":"20"},
					{"value":"25"},
					{"value":"30"},
					{"value":"35"},
					{"value":"40"},
					{"value":"45"},
					{"value":"50"},
					{"value":"55"},
				]
			},
			valueField: 'value',
			displayField: 'value',
			editable: false,
			fieldLabel: '分'
		}],
	}],
	
    fbar : [{
		text: '保存', 
		width: 45,
		action: 'save',
		//scope: this,
		handler: function(btn){
			btn.up('window').onSave();
		}
	},{
		text: '取消',
		width: 45,
		//scope: this,
		handler: function(btn){
			btn.up('window').destroy();
			//this.close();
		}
	}],	
   
	onSave: function(){
		var me = this;
		var w = this.down('combo[name=w]').getValue(),
			h = this.down('combo[name=h]').getValue(),
			m = this.down('combo[name=m]').getValue()
		
		if (w == null || h==null || m==null){
			Ext.Msg.alert('提示','请选择完整上课时间'); return;
		}	


		Ext.Msg.confirm('询问','是否保存？',function(id){
			if( id == "yes"){
				var obj = {
					"timely"     : w + h + ':' + m,
					"teacherID"  : me.parentRecord.data.teacherID,
					"timely_list": me.parentRecord.data.timely_list_one2n, //old val
				};
				console.log(obj);
				//me.fireEvent('save',obj,me); 
				
				Ext.data.JsonP.request({
		            url: Youngshine.app.getApplication().dataUrl + 'createTeacherOne2nTimely.php',
		            callbackKey: 'callback',
		            params:{
		                data: JSON.stringify(obj)
		            },
					//params: obj,
		            success: function(result){
						console.log(result)
						//var ret = Ext.JSON.decode(response.responseText)
						if(result.success){
							// 添加到grid
							me.parentView.down('grid').getStore().add({
								"timely": obj.timely
							})
							
							// 更新前端记录，旧的＋希能的
							me.parentView.parentRecord.set({
								"timely_list_one2n": obj.timely_list + ',' + obj.timely
							})
							
							me.close();
						}	
					},
		        });

			}
		})
	}
});