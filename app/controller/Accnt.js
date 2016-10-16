// 缴费
Ext.define('Youngshine.controller.Accnt', {
    extend: 'Ext.app.Controller',

	//stores: ['Studying'],
	
    refs: [{
		ref: 'accntlist',
		selector: 'accnt-list'	
	},{
		ref: 'accntconsult',
		selector: 'accnt-consult'	
	}],

    init: function() {
        this.control({
			'accnt-list': {
				search: this.accntlistSearch,
			},	
			'accnt-consult': {
				search: this.accntconsultSearch,
			},			
        });
    },


	// 缴费，show跳转来自main controller
	showAccnt: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.accnt.Accnt');
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID'),
		} /*
        var url = this.getApplication().dataUrl + 
			'readAccntList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Accnt');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        }); */
		
		// 该校的分校区
	    var url = this.getApplication().dataUrl + 
			'readSchoolsubList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Schoolsub');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });
	},	
	// 缴费，show跳转来自main controller
	showAccntConsult: function(){
		var me = this;
		var win = Ext.create('Youngshine.view.accnt.AccntConsult');
		win.down('grid').getStore().removeAll(); // 先晴空
		
		var obj = {
			"schoolID": localStorage.getItem('schoolID'),
		} /*
        var url = this.getApplication().dataUrl + 
			'readAccntList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Accnt');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        }); */
		
		// 该校的分校区
	    var url = this.getApplication().dataUrl + 
			'readConsultList.php?data=' + JSON.stringify(obj);
        var store = Ext.getStore('Consult');
		store.removeAll();
		store.clearFilter();
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
            },
            scope: this
        });
	},	
	
    accntlistSearch: function(obj,win) {
		var store = Ext.getStore('Accnt'); 
		store.removeAll();
        var url = this.getApplication().dataUrl + 
			'readOrdersList.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
				var total = 0
				store.each(function(record){
					total += parseInt(record.data.amount)
				})
				win.down('displayfield[itemId=subtotal]').setValue(total)
            },
            scope: this
        });
    },	
	
    accntconsultSearch: function(obj,win) {
		var store = Ext.getStore('Accnt'); 
		store.removeAll();
        var url = this.getApplication().dataUrl + 
			'readAccntListByConsult.php?data=' + JSON.stringify(obj);
		store.getProxy().url = url;
        store.load({
            callback: function(records, operation, success) {
				console.log(records);
				var total = 0
				store.each(function(record){
					total += parseInt(record.data.amount)
				})
				win.down('displayfield[itemId=subtotal]').setValue(total)
            },
            scope: this
        });
    },	
});