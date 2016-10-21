// 日常收支简单记账
Ext.define('Youngshine.store.Ledger',{
    extend: 'Ext.data.Store',
    model: 'Youngshine.model.Ledger',
	
    proxy: {
        type: 'jsonp',
        //url: '/users.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false,

});