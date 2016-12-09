Ext.define('Youngshine.Application', {
    name: 'Youngshine',

    extend: 'Ext.app.Application',

	dataUrl: 'http://www.xzpt.org/ghjy_dean/script/',  //服务端脚本位置php

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
		'Main','Student','Teacher','Consult','Accnt','Kclist','Schoolsub','Ledger'
    ],

    stores: [
        // TODO: add stores here
		'Schoolsub','Student','Consult','Teacher','Kclist',
		'Accnt','AccntFee','AccntDetail',"Course",'CourseAssess',
		'Subject','Ledger','One2nStudent'
    ]
});
