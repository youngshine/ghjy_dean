Ext.define('Youngshine.store.Course',{
    extend: 'Ext.data.Store',
    model: 'Youngshine.model.Course',
	
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