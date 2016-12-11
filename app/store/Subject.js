// 固定的数据小的表，先全部加载
Ext.define('Youngshine.store.Subject',{
    extend: 'Ext.data.Store',
    model: 'Youngshine.model.Subject',
	
    proxy: {
        type: 'jsonp',
        url: 'http://www.xzpt.org/ghjy_dean/script/readSubjectList.php',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    autoLoad: false,

});