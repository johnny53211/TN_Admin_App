const dbAdapter = {
	db_: '',
	schemaName: 'public',
	databaseName: 'tn_maxval_app',
	initDatabase: function (argv) {
		console.log('Initializing database...');
		let options = { databaseName: this.databaseName };
		let db = require('./db_adapter/' + argv.db + '/index.js');
		db.init(options ? options : {}, function (err) {
			if (err) { throw err; }
			dbAdapter.db_ = db;
		});
	}
};
module.exports = dbAdapter;


