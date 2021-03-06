// 上课课时出勤学生及其家长评价（一对多才有评价）
Ext.define('Youngshine.model.CourseAssess', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'courseNo'},  // group by
		{name: 'kcType'},  //大小班，一对一
		{name: 'hour'}, 
		{name: 'flag'}, 
		{name: 'assessTag_list'}, 
		{name: 'assessNote'}, 
		
		{name: 'beginTime'}, 
		{name: 'studentID'},
		{name: 'studentName'},
		{name: 'teacherID'}, 
		{name: 'kcTitle'},  //班级名称或课程知识点（一对一）
		{name: 'kclistID'},
		{name: 'created'},
		
		// 按班级＋日期分组，也就是一个班级一天智能点名一次
		{ name: 'fullDate', convert: function(value, record){
				//var date = record.get('drive_date');
				return record.get('beginTime').substr(0,10); 
			} 
		},
    ]
});