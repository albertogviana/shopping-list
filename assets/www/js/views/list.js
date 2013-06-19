window.ListView = Backbone.View.extend({

	events : {
		"click #createListName" : "create",
	},

	initialize : function() {
		this.template = _.template(tpl.get('lists'));
		this.listModel = new ListModel(Database.getDb());
		
		this.listAll();
		
	},

	render : function(eventName) {
		$(this.el).html(this.template());
		return this;
	},
	
	listAll : function() {
		this.data = [];

		this.listModel.findAll(function(result) {
			this.data = $.parseJSON(result);
		
			$("#results").empty('');
			$("#results").append('<ul>');
			var ul = $("#results > ul");

			ul.addClass("topcoat-list");
			
			$(this.data).each(function(id, val) {
				ul.append(new ListItemView({
					model : val
				}).render().el);
			});

		});
	},

	create : function() {
		var data = this.$('#listName').val();
		
		if(data == '') {
			return;
		}
		
		this.listModel.add(data);
		this.$('#listName').val('');
		this.listAll();
	}

});

window.ListItemView = Backbone.View.extend({

	initialize : function() {
		this.template = _.template(tpl.get('list-item'));
	},

	render : function(eventName) {
		$(this.el).html(this.template(this.model));
		return this;
	}

});