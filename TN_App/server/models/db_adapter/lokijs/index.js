'use strict';

const path = require('path');
const loki = require('lokijs');
let config = require('./config');
let dbSchema = require('../../databaseHelper/schema');
let db;

/**
 * Function used to create and inititalize database file -- Bansilal
 * @param options  - option object
 * @param callback  - callback funtion
 * @return
 */
let init = function (options, callback) {
	let dbName = config.LOKI_DATABASE;
	let dbFile = path.join(__dirname, dbName + '.json');
	db = new loki(dbFile);
	db.loadDatabase({}, function (err) {
		console.log("database created.");
		schemaInit();
	});
	callback();
};

/**
 * Function used to create new collection if not exist on database -- Binod
 */
let schemaInit = function () {
	// iterate all schema object and create collection object for check & create collection 
	for (var schema in dbSchema) {
		let schemaName = dbSchema[schema];
		let collectionObj = {
			table: schemaName.tableName,
			unique_id: schemaName.uniqueField
		};
		// check collection already exist else create new collection 
		createCollection(collectionObj, function (err, response) {
		});
	}
};
/**
 * Function used to create new collection -- Bansilal
 * @param data  - array of object with data
 * @param callback  - callback funtion
 * @return
 */
let createCollection = function (data, callback) {
	let table = data.table, unique_id = data.unique_id;
	let collection = db.getCollection(table);
	if (collection === null) {
		collection = db.addCollection(table, {
			unique: [unique_id],
			disableMeta: true
		});
	}
	if (collection)
		callback('', 1);
	else
		callback('', 0);
};
/**
 * Function used to get list of collections -- Bansilal
 * @param data  - array of object with data
 * @param callback  - callback funtion
 * @return
 */
let listCollections = function (data, callback) {
	let error = '', tableList = [];
	let collectionArray = db.listCollections();
	for (let collectionObj of collectionArray) {
		tableList.push(collectionObj.name);
	}
	callback(error, tableList);
};
/**
 * Function used to save data into database collection -- Bansilal
 * @param data  - array of object with data
 * @param callback  - callback funtion
 * @return
 */
let saveData = function (data, callback) {
	let table = data.table, records = data.data, query = data.query;
	let unique_id = data.unique_id;

	// if getting query then update data else go for insert as new record
	if (query) {
		let updateData = {
			table: table,
			data: records,
			query: query
		};
		//data is going for update
		update(updateData, function (err, res) {
			callback(err, res);
		});

	} else {
		let insertData = {
			table: table,
			data: records,
			unique_id: unique_id
		};
		//data is going for insert as new record
		insert(insertData, function (err, res) {
			callback(err, res);
		});
	}
};
/**
 * Function used to insert data into database collection -- Bansilal
 * @param insertData  - data with array of object for insert
 * @param callback  - callback funtion
 * @return
 */
let insert = async function (insertData, callback) {
	let table = insertData.table, entry = insertData.data, unique_id = insertData.unique_id;

	// getting collection via table name
	let collection = db.getCollection(table);
	if (!collection)
		return callback('collection not found on database', null);

	let maxId = collection.maxId + 1;

	let insertedIds = [];
	for (let recordObj of entry) {
		recordObj[unique_id] = maxId;
		collection.insert(recordObj);
		insertedIds.push(maxId);
		maxId++;
	}

	db.saveDatabase(function (err) {
		return callback(err, insertedIds);
	});
};
/**
 * Function used to update data into database collection -- Bansilal
 * @param updateData  - data with array of object for update
 * @param callback  - callback funtion
 * @return
 */
let update = function (updateData, callback) {
	let table = updateData.table, entry = updateData.data, query = updateData.query;
	let collection = db.getCollection(table);
	if (!collection)
		return callback('', 0);

	// get query object from array of data// 
	let [baseTblQuery] = whereQueryFormation(query);
	let existingRecordArray = collection.find(baseTblQuery);

	if (Array.isArray(existingRecordArray) && existingRecordArray.length) {
		let postedRecord = entry[0], response = [];
		for (let existingRecordObj of existingRecordArray) {
			// only update the posted key values on existing record object 
			let updatedObj = Object.assign(existingRecordObj, postedRecord);
			response.push(collection.update(updatedObj));
		}
		db.saveDatabase(function (err) {
			return callback(err, response.length);
		});
	}
	else
		return callback('', 0);
};
/**
 * Function used to get list of data from database collection -- Bansilal
 * @param data  - data with object containing multiple filter params
 * @param callback  - callback function
 * @return
 */
let get = function (data, callback) {
	let table = data.table, query = data.query, limit = data.limit, offset = data.offset, join = data.join;
	//getting where query in lokijs format by passing query array data & join data
	let [baseTableQuery, rightTableQuery] = whereQueryFormation(query, join);

	// showing created lokijs where query
	if (data.show_query)
		return callback('', [baseTableQuery, rightTableQuery]);

	let orderByField = '', order = '';
	// getting orderByField & respected order from orderBy object 
	if (data.order_by) {
		let orderBy = data.order_by;
		for (const [key, value] of Object.entries(orderBy)) {
			orderByField = key; order = value;
		}
	}

	let collection = db.getCollection(table),
		existingRecord = {};
	if (collection !== null) {
		let baseTableCollection = collection.chain();

		if (baseTableQuery)
			baseTableCollection = baseTableCollection.find(baseTableQuery);

		if (data.count)
			return callback('', baseTableCollection.filteredrows.length);

		if (offset)
			baseTableCollection = baseTableCollection.offset(offset);

		if (limit)
			baseTableCollection = baseTableCollection.limit(limit);

		if (orderByField) {
			let orderSeq = {};
			orderSeq.desc = (order == 'asc') ? false : true;
			baseTableCollection = baseTableCollection.simplesort(orderByField, orderSeq);
		}
		// check if join condition
		if (Array.isArray(join) && join.length) {
			let joinDataObj = join[0];
			let rightTableCollection = db.getCollection(joinDataObj.with_table).chain().find(rightTableQuery);

			let joinQuery = baseTableCollection.eqJoin(rightTableCollection, joinDataObj.with_column, joinDataObj.column);
			existingRecord = joinQuery.data(true).map(data => {
				return { ...data.left, ...data.right };
			});
		} else {
			existingRecord = baseTableCollection.data();
		}
	}
	return callback('', existingRecord);
};
/**
 * Function used to remove the data from the collection -- Bansilal
 * @param name  - string
 * @return
 */
let remove = function (data, callback) {
	let deletedRecords = 0;
	data.forEach(function (obj) {
		let table = obj.table, query = obj.query;
		let [baseTblQuery] = whereQueryFormation(query);
		let collection = db.getCollection(table);
		if (collection !== null) {
			let matchedRecords = collection.chain().find(baseTblQuery);
			deletedRecords += matchedRecords.data().length;
			matchedRecords.remove();
		}
	});
	// return no. of deleted records
	db.saveDatabase(function (err) {
		callback(err, deletedRecords);
	});
};
/**
 * Function used to create lokijs query for nest data  -- Binod
 * @param nestData  - nested data with object
 * @return
 */
let nestQueryFormation = function (nestData) {
	nestData = nestData.nest;
	let queryArray = [];
	if (Array.isArray(nestData) && nestData.length) {
		nestData.forEach(function (obj) {
			let andQueryArray = [];
			obj.query.forEach(function (obj) {
				let fieldName = Object.keys(obj)[0];
				// get last string from field name if separate with schema and table name like schema.table.field
				fieldName = fieldName.split(".");
				fieldName = fieldName.slice(-1)[0];

				let fieldValue = obj[Object.keys(obj)[0]];
				let conditionValue = (obj.condition) ? obj.condition : 'AND';
				// mapping operator from config//
				let configOperators = config.operators;
				let operator = (obj.operator) ? configOperators[obj.operator] : configOperators['='];
				// if condition is AND then add key value in same object else create new object with key value and push//
				if (conditionValue == 'AND') {
					andQueryArray.push({ [fieldName]: { [operator]: fieldValue } });
				} else {
					queryArray.push({ [fieldName]: { [operator]: fieldValue } });
				}
			});
			queryArray.push({ '$and': andQueryArray });
		});
	}
	return queryArray;
};

/**
 * Function using for where query forming as lokijs object form -- Binod
 * checking also left(base) table as well right table where condition
 * @param query  - contain the query object of array data
 * @param join  - join data on array of object (lokijs support single join so process first join object only)
 * @return
 */
let whereQueryFormation = function (query, join = '') {
	let baseTableQuery = {}, rightTableQuery = {};
	if (Array.isArray(query) && query.length) {
		let isRightTableQuery = false, orQueryArrayForRight = [], andQueryArrayForRight = [];
		let orQueryArrayForBase = [], andQueryArrayForBase = [];
		// get right table name from join array data
		let rightTableName = getRightTable(join);

		query.forEach(function (obj) {
			let fieldName = Object.keys(obj)[0], isRightTableCondition = false;
			let fieldNameArray = fieldName.split(".");
			//checking if where condition is for right table
			if (fieldName.indexOf('.') !== -1 && fieldNameArray.indexOf(rightTableName) !== -1 && rightTableName)
				isRightTableCondition = true;

			// get last string from field name if separate with schema and table name like schema.table.field 
			fieldName = fieldNameArray.slice(-1)[0];

			let fieldValue = obj[Object.keys(obj)[0]];
			let conditionValue = (obj.condition) ? obj.condition : 'AND';
			// mapping operator from config//
			let configOperators = config.operators;
			let operator = (obj.operator) ? configOperators[obj.operator] : configOperators['='];
			// if condition is AND then add key value in same object else create new object with key value and push//
			if (isRightTableCondition) {
				isRightTableQuery = true;
				if (conditionValue == 'AND') {
					andQueryArrayForRight.push({ [fieldName]: { [operator]: fieldValue } });
				} else {
					orQueryArrayForRight.push({ [fieldName]: { [operator]: fieldValue } });
				}

				// check nest condition and form query respected nest data and push query for right table// 
				if (obj.and)
					andQueryArrayForRight.push(formedNestQuery(obj.and));

			} else {
				if (conditionValue == 'AND') {
					andQueryArrayForBase.push({ [fieldName]: { [operator]: fieldValue } });
				} else {
					orQueryArrayForBase.push({ [fieldName]: { [operator]: fieldValue } });
				}

				// check nest condition and form query respected data and push query for base table//
				if (obj.and)
					andQueryArrayForBase.push(formedNestQuery(obj.and));
			}
		});

		if (isRightTableQuery) {
			orQueryArrayForRight.push({ '$and': andQueryArrayForRight });
			rightTableQuery = { '$or': orQueryArrayForRight };
		}

		orQueryArrayForBase.push({ '$and': andQueryArrayForBase });
		baseTableQuery = { '$or': orQueryArrayForBase };
	}
	return [baseTableQuery, rightTableQuery];
};

/**
 * Function using for return formed nested query -- Binod 
 * @param andNestDataObj  - passing complete and condition nest object for process to make nested query
 * return object contain a condition ($and or $or) with value as formed query contain by nestedQuery variable  
 * @return
 */
let formedNestQuery = function (andNestDataObj) {
	let configOperators = config.operators;
	let nestedQuery = nestQueryFormation(andNestDataObj);
	return { [configOperators[andNestDataObj.condition]]: nestedQuery };
};

/**
 * Function using for return right table name from join array data -- Binod 
 * lokijs support single table join so we consider only single table join data from join array
 * @param joinArray  - lokijs support single table join so we consider only single table join data from join array
 * @return
 */
let getRightTable = function (joinArray) {
	let rightTableName = '';
	if (joinArray && Array.isArray(joinArray) && joinArray.length) {
		let joinObj = joinArray[0];
		rightTableName = joinObj.with_table;
	}
	return rightTableName;
};

module.exports = {
	init: init,
	createCollection: createCollection,
	listCollections: listCollections,
	saveData: saveData,
	insert: insert,
	update: update,
	remove: remove,
	get: get
}