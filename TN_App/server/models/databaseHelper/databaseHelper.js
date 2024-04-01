const dbAdapter = require('../../models/initDatabase');

let databaseHelper = {
	"saveRecord": function (req, query, callback) {
		databaseHelper.processRequest(req, query, function (response) {
			callback(response);
		});
	},
	"getRecord": function (options, callback) {
		dbAdapter.db_.get(options, function (err, response) {
			callback(response);
		});
	},
	"deleteRecord": function (options, callback) {
		dbAdapter.db_.remove(options, function (err, response) {
			callback(response);
		});
	},
	/* Function used to process insert & update request -- Binod */
	'processRequest': function (req, query, callback) {
		let tableName = req.type,
			unique_id = req.unique_id,
			data = req.body,
			bulkArray = {
				table: tableName,
				unique_id: unique_id,
				indices: unique_id,
				autoupdate: true,
				data: data,
				query: query,
				schema: dbAdapter.schemaName
			};
		dbAdapter.db_.saveData(bulkArray, function (err, response) {
			callback(response);
		});
	}
}

module.exports = databaseHelper;