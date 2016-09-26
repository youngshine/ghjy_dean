// 上课课时数
Ext.define('Youngshine.model.Course', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'kcType'},  //大小班，一对一
		{name: 'hour'}, 
		{name: 'beginTime'}, 
		{name: 'studentID'},
		{name: 'studentName'},
		{name: 'teacherID'}, 
		{name: 'title'},  //班级名称或课程知识点（一对一）
		{name: 'created'},
		
		// 按班级＋日期分组，也就是一个班级一天智能点名一次
		{ name: 'fullDate', convert: function(value, record){
				//var date = record.get('drive_date');
				return record.get('beginTime').substr(0,10); 
			} 
		},
    ]
});