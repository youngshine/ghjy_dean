// no group by courseNo
Ext.define('Youngshine.store.CourseAssess',{
    extend: 'Ext.data.Store',
    model: 'Youngshine.model.CourseAssess',
	
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