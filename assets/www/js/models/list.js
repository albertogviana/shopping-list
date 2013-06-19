window.ListModel = Backbone.Model.extend({
	initialize : function(db) {
		ListModel.db = db;
		ListModel.db.transaction(function(tx) {
			console.log('Dropping list table');
//			tx.executeSql('DROP TABLE IF EXISTS list');
			var sql = "CREATE TABLE IF NOT EXISTS list ( "
					+ "id INTEGER PRIMARY KEY AUTOINCREMENT, "
					+ "name VARCHAR(100))";
			console.log('Creating list table');
			tx.executeSql(sql);
		}, function(tx, error) {
			alert('Transaction error ' + error);
		}, function(tx) {
			callback();
		});
	},

	add : function(name) {
		ListModel.db.transaction(function(tx) {
			var sql = "INSERT INTO list (id, name) " + "VALUES (?,?)";

			console.log('Inserting');
			tx.executeSql(sql, [ null, name ]);
		}, function(tx, error) {
			alert('Transaction error ' + error);
		}, function(tx) {
			callback();
		});
	},

	findAll : function(callback) {
		ListModel.db.transaction(function(tx) {
			var sql = "SELECT * FROM list ORDER BY name";
			tx.executeSql(sql, [], function(tx, results) {
				var len = results.rows.length;
				console.log("Returned rows = " + results.rows.length);
				
				var row = [];
				for ( var i = 0; i < len; i++) {
					row[i] = results.rows.item(i);
				}
				
				callback(JSON.stringify(row));
				
			});
			
		});
		
	}
	
});

window.ListCollection = Backbone.Collection.extend({
	model: ListModel
	
});