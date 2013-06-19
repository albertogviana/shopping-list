var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "list",
	},

	list : function() {
		listView = new ListView();
		$('body').html(listView.render().el);
	},

});

//Backbone.View.prototype.close = function () {
//    console.log('Closing view ' + this);
//    if (this.beforeClose) {
//        this.beforeClose();
//    }
//    this.remove();
//    this.unbind();
//};

function startApp() {
	tpl.loadTemplates([ 'lists', 'list-item'], function() {
		app = new AppRouter();
		Backbone.history.start();
	});
}