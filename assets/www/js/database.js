var Database = {
	getDb: function() {
		return window.openDatabase("ShopListDB", "1.0", "Shopping List DB",
				200000);
	}
};