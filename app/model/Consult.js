// 咨询师
Ext.define('Youngshine.model.Consult', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'consultID'}, 
		{name: 'consultName'}, 
		{name: 'schoolsubID'},
		{name: 'schoolsub'}, // 所属分校区 fullname
		{name: 'schoolID'}, 
		{name: 'schoolName'},

    ]
});