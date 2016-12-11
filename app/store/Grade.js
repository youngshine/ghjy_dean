// 
Ext.define('Youngshine.store.Grade',{
    extend: 'Ext.data.Store',
    model: 'Youngshine.model.Grade',
	
    proxy: {
        type: 'jsonp',
        url: 'http://www.xzpt.org/ghjy_dean/script/readGradeList.php',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false,

});