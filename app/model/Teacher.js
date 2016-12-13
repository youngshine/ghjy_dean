Ext.define('Youngshine.model.Teacher', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'teacherID'}, 
		{name: 'teacherName'},
		{name: 'userId'}, //企业号
		{name: 'subjectID'}, 
		{name: 'subjectName'}, 
		{name: 'schoolID'}, 
		{name: 'schoolName'},
		{name: 'gender'}, 
		{name: 'phone'}, 	
		{name: 'note'},	
		{name: 'timely_list_one2n'},	
    ]
});