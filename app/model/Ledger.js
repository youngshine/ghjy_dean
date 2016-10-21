// 日常收支
Ext.define('Youngshine.model.Ledger', {
    extend: 'Ext.data.Model',
    //idProperty: 'admin_id',
    fields: [
		{name: 'ledgerID'}, 
		{name: 'ledgerDate'}, 
		{name: 'ledgerItem'}, 
		{name: 'ledgerType'}, // 收入或支出
		{name: 'amt_in'},
		{name: 'amt_out'},
		{name: 'note'},
		
		{name: 'schoolID'},  // 学校
		{name: 'schoolName'}, //分校区
		
    ]
});