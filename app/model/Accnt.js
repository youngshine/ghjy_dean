// 缴费 update  `ghjy_accnt`  set schoolsubID=6  WHERE consultID=27
Ext.define('Youngshine.model.Accnt', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'accntID'}, 
		{name: 'accntDate'}, 
		{name: 'accntType'}, // 大小班，一对一，退费
		{name: 'payment'}, // 学生
		{name: 'note'},
		{name: 'amount'}, 
		{name: 'amount_ys'}, //应收

		//{name: 'created'},
		{name: 'studentID'}, // 学生
		{name: 'studentName'},
		
		{name: 'consultID'},//所属的咨询师
		{name: 'consultName'},
		
		{name: 'schoolsubID'}, //分校区
		{name: 'schoolsub'},
		
		{name: 'schoolID'},
    ]
});