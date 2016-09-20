Ext.define('Youngshine.Application', {
    name: 'Youngshine',

    extend: 'Ext.app.Application',

	dataUrl: 'http://www.xzpt.org/ghjy_dean/script/',  //服务端脚本位置php

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
		'Main','Student','Study','Prepaid','Kcb','Assess','Teacher'
    ],

    stores: [
        // TODO: add stores here
		'District','School','Student','Study','Zsd','Kcb','Prepaid','Followup',
		'Assess','Topic-assess','Teacher','Pricelist'
    ]
});
