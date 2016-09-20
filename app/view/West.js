Ext.define('Youngshine.view.West', {
    extend: 'Ext.Container',
    //alias: 'widget.pageHeader',
	xtype: 'mywest',
	
	title: '功能导航',
	layout: {
		// layout-specific configs go here
		type: 'accordion',
		titleCollapse: true,
		animate: true,
		//activeOnTop: true
	},
	collapsed: false,
	collapsible: true,

	items: [{
		title: '咨询师',
		html: '<div style="margin:10px 5px;cursor:pointer">'+
			'<div class="menuitem" title="enroll" style="margin:5px;">注册学生</div>'+
			'<div style="margin:10px 0;cursor:auto;"><hr></div>'+
			'<div class="menuitem" title="assess" style="margin:5px;">测评</div>'+
		
			'<div style="margin:10px 0;cursor:auto;"><hr></div>'+
			'<div class="menuitem" title="prepaid" style="margin:5px;">销售课程套餐</div>'+
			'<div class="menuitem" title="study" style="margin:5px;">待分配课程内容</div>'+
			'<div class="menuitem" title="kcb" style="margin:5px;">待排课</div>'+
			'<div class="menuitem" title="prepay" style="margin:5px;">退费</div>'+
		
			'<div style="margin:10px 0;cursor:auto;"><hr></div>'+
			'<div class="menuitem" title="teacher" style="margin:5px;">教师</div>'+
			'<div class="menuitem" title="pricelist" style="margin:5px;">课程价格表</div>'+
		
			'<div style="margin:10px 0;cursor:auto;"><hr></div>'+
			'<div class="menuitem" title="pswreset" style="margin:5px;">密码修改</div>'+
			'<div class="menuitem" title="logout" style="margin:5px;">退出</div>'+
		    '</div>'
    }],
	listeners: {
		el: {
			delegate: 'div.menuitem',
			click: function(e,obj){
				Ext.getCmp(this.id).onNav(obj);
			},
		}
	},
	onNav: function(obj){
		switch(obj.title){
			case 'enroll': {
				this.fireEvent('navEnroll'); //controller: Main
				break;
			}
			// 购买课程及添加内容、排课
			case 'prepaid': {
				this.fireEvent('navPrepaid'); 
				break;
			}
			// 待添加课程内容
			case 'study': {
				this.fireEvent('navStudy'); 
				break;
			}
			// 待排课表
			case 'kcb': {
				this.fireEvent('navKcb'); 
				break;
			}
			// 报读前测评知识点
			case 'assess': {
				this.fireEvent('navAssess'); 
				break;
			}
			case 'test': {
				this.fireEvent('navTest'); //controller: Main2
				break;
			}
			case 'teacher': {
				this.fireEvent('navTeacher'); //controller: Main2
				break;
			}
			case 'pricelist': {
				this.fireEvent('navPricelist'); //controller: Main2
				break;
			}
			case 'pswreset':{
				this.fireEvent('navPswreset');
				break;
			}
			case 'logout': {
				var me = this;
				Ext.Msg.confirm('询问', '是否退出系统？', function(btn){
					if(btn=='yes'){
						me.fireEvent('navLogout');
					}
				});
				
				break;
			}
		}
	}
});