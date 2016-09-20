Ext.define('Youngshine.model.Student', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'studentID'}, 
		{name: 'studentName'}, 
		{name: 'psw'}, 
		{name: 'gender'}, 
		{name: 'born'}, 
		{name: 'addr'}, 
		{name: 'district'}, 
		{name: 'phone'}, 
		//{name: 'qq'}, 
		//{name: 'email'}, 
		{name: 'grade'}, 
		{name: 'school'}, 
		{name: 'level_list'}, //学生各学科数理化123学习层次：高中低，对应选择教学题目难度：高中低

		{name: 'enrolled'}, //web注册后，正式到校报名，打钩
		{name: 'note'}, 
		{name: 'coupon'}, // 代金券
		{name: 'wxID'}, // 代金券
		{name: 'consultID'}, //所属咨询师，可能为0 ，尚未分配咨询师
		//{name: 'coreport'}, //学管与家长联络记录，如同 聊天记录
		{name: 'current'}, // 禁用
		{name: 'created'}, // 录入时间，排序用
		
		{name: 'isEnrolled', 
			convert: function(value, record){
				return record.get('enrolled')==0?'未报名':'已报名';
			}
		},
		// 组合字段，搜索过滤用, 中间间隔空格， 避免...
		{ name: 'myStudent', convert: function(value, record){
				//var date = record.get('drive_date');
				return record.get('studentName') + ' ' + record.get('gender') + ' ' +
					record.get('grade') + ' ' + record.get('school') + ' ' +
					record.get('isEnrolled'); 
			} 
		},
		// 组合字段，搜索过滤用, 中间间隔空格， 避免...
		{ name: 'fullStudent', convert: function(value, record){
				//var date = record.get('drive_date');
				return record.get('studentName') + ' ' + record.get('phone'); 
			} 
		},			
    ]
});