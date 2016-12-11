// 咨询师
Ext.define('Youngshine.model.Consult', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'consultID'}, 
		{name: 'consultName'}, 
		{name: 'gender'}, 
		{name: 'userId'}, 
		{name: 'phone'}, 
		{name: 'note'}, 
		{name: 'isChief'}, //咨询主管、分校校长＝1
		{name: 'schoolsubID'},
		{name: 'schoolsub'}, // 所属分校区 fullname
		{name: 'schoolID'}, 
		{name: 'schoolName'},
		
		/*
		{ name: 'fullChief', convert: function(value, record){
				return record.get('isChief') ? '是' : '否'
			} 
		}, */

    ]
});