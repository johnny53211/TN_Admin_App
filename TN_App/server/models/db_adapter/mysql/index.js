'use strict';

let mysql = require('mysql');
let config = require('./config');
let db;

/**
 * Function used to creating database connection with mysql server -- Binod
 * @param options  - option object
 * @param callback  - callback function
 * @return
 */
var init = function (options, callback) {
  // set common connection options as object
  let connOptions = {
    multipleStatements: true,
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    dateStrings: true
  };
  // if connection pool then set no.of connection & then create pool
  if (config.CONNECTION_POOL) {
    connOptions.connectionLimit = config.CONNECTION_Limit;
    db = mysql.createPool(connOptions);
    db.getConnection(function (err, connection) {
      if (err) {
        console.log('mysql connection error: ', err.code);
      } else {
        connection.release();
      }
    });
  } else {
    db = mysql.createConnection(connOptions);
    db.connect(err => {
      if (err) {
        console.error('mysql connection error: ', err.code);
      } else {
        console.log('mysql database connected.');
      }
    });
  }

  callback();
};

/**
 * Function used to execute sql query -- Binod
 * @param query  - query syntax as string
 * @param params  - fields values on array
 * @param callback  - callback function
 * @return
 */
var dbQuery = async function (query, params, callback) { // console.log('query', query, 'params', params);
  db.query(query, params, function (error, results) {
    if (error) {
      // if get specific error message then return else complete error through
      if (error.sqlMessage) {
        return callback(error.sqlMessage, null);
      } else if (error.code) {
        return callback('mysql connection error: ' + error.code, null);
      } else {
        return callback(error, null);
      }
    } else {
      return callback(null, results);
    }
  });
}

/**
 * Function used to create table on database -- Binod
 * @param data  - passing data as object 
 * @param callback  - callback function
 * @return
 */
var createCollection = function (data, callback) {
  let table = data.table, fields = data.fields, fieldQuery = '';
  // fields data iterating on loop and creating table query with all fields 
  for (const fieldDetails of fields) {
    fieldQuery += fieldDetails.field;
    if (fieldDetails.type)
      fieldQuery += ` ${fieldDetails.type}`;

    if (fieldDetails.size)
      fieldQuery += `(${fieldDetails.size})`;

    if (fieldDetails.is_null)
      fieldQuery += ` ${fieldDetails.is_null}`;

    if (fieldDetails.extra)
      fieldQuery += ` ${fieldDetails.extra}`;

    fieldQuery += ", ";
  }
  // adding primary key on query syntax
  fieldQuery += ` PRIMARY KEY (${data.primary_key})`;
  // making final query for create a table on database
  let sql = `CREATE TABLE ${table} (${fieldQuery})`;
  dbQuery(sql, '', function (err, res) {
    if (res.serverStatus) {
      callback('', 1);
    } else {
      callback(err, 0);
    }
  });
};

/**
 * Function used to get all tables from database -- Binod
 * @param data  - empty, dont need to pass on this
 * @param callback  - callback function
 * @return
 */
var listCollections = function (data, callback) {
  // making query for list all tables 
  let queryData = {
    'select': 'SHOW TABLES',
  };
  get(queryData, function (err, response) {
    let result = [];
    // get table names and push on result array
    response.forEach(function (row) {
      let tableName = Object.values(row);
      tableName = tableName.join();
      result.push(tableName);
    });
    callback(err, result);
  });
};

/**
 * Function used to insert & update data into table -- Binod
 * @param data  - data is object and containing table, query and save or update data on data key 
 * @param callback  - callback function
 * @return
 */
var saveData = function (data, callback) {
  let table = data.table, records = data.data, query = data.query;
  // if get query go for update else to insert as new record//
  if (query) {
    let updateData = {
      table: table,
      data: records,
      query: query
    };
    update(updateData, function (err, res) {
      callback(err, res);
    });
  } else {
    let insertData = {
      table: table,
      data: records
    };
    insert(insertData, function (err, res) {
      callback(err, res);
    });
  }
};

/**
 * Function used to insert data into table -- Binod
 * @param insertData  - object containing table and save data on data key which is on array 
 * @param callback  - callback function
 * @return
 */
var insert = function (insertData, callback) {
  let table = insertData.table, entry = insertData.data, fields = '';
  // getting first object for consideration of fields
  let entryForFields = entry[0];

  // get table fields from entry and making comma separated query syntax //
  for (const [key, value] of Object.entries(entryForFields)) {
    fields += `${key}, `;
  }
  fields = fields.replace(/,\s*$/, ""); // remove last comma

  // values pushed in array from below loop//
  let valueBundle = [];
  for (const recordRow of entry) {
    let valuePerRow = [];
    for (let value of Object.values(recordRow)) {
      valuePerRow.push(value);
    }
    valueBundle.push(valuePerRow);
  }

  // making final query for insert record on table
  let sql = `INSERT INTO ${table} (${fields}) VALUES ?`;
  dbQuery(sql, [valueBundle], function (err, res) {
    // getting first insert id and make all other formed id by affected rows 
    let insertIds = [];
    if (!err)
      if (res.affectedRows) {
        for (let i = 0; i < res.affectedRows; i++) {
          let lastInsertedId = i + res.insertId;
          insertIds.push(lastInsertedId);
        }
      }

    callback(err, insertIds);
  });
};

/**
 * Function used to update data into table -- Binod
 * @param updateData  - object containing table, query and update data on data key which is on array 
 * @param callback  - callback function
 * @return
 */
var update = function (updateData, callback) {
  let table = updateData.table, query = updateData.query, entry = updateData.data;
  // getting where condition query
  let whereCondition = whereQueryFormation(query);

  // only we are considering first object for data update
  let recordRow = entry[0];
  let setFieldValues = setQueryFormation(recordRow);
  // creating final update query for record with where condition
  let updateQuery = `UPDATE ${table} SET ${setFieldValues} WHERE ${whereCondition};`;

  // execute update query and return no. of affected rows
  dbQuery(updateQuery, '', function (err, res) {
    if (res) {
      callback(err, res.affectedRows);
    } else {
      callback(err, null);
    }
  });
};

/**
 * Function used to get data from table -- Binod
 * @param data  - object containing table, query, join, select, group_by key for forming query
 * @param callback  - callback function
 * @return
 */
var get = function (data, callback) {
  let table = data.table, query = data.query, orderBy = '';
  // creating order by sql syntax
  if (data.order_by) {
    for (const [key, value] of Object.entries(data.order_by)) {
      orderBy += `${key} ${value}, `;
    }
    orderBy = orderBy.replace(/,\s*$/, "");
  }
  // if select fields passing else select all fields from table
  let select = '*';
  if (data.select)
    select = data.select;

  if (data.count)
    select = 'count(*) as count';

  let selectQuery;
  selectQuery = (table) ? `SELECT ${select} FROM ${table}` : `${select}`;

  if (data.join)
    selectQuery += joinQueryFormation(data.join);

  if (Array.isArray(query) && query.length) {
    let whereCondition = whereQueryFormation(query);
    selectQuery = `${selectQuery} WHERE ${whereCondition}`;
  }

  if (data.group_by)
    selectQuery += ` GROUP BY ${data.group_by} `;

  if (data.having)
    selectQuery += ` HAVING ${data.having} `;

  if (data.count) {
    dbQuery(selectQuery, '', function (err, res) {
      if (res)
        return callback(err, res[0].count);
      else
        return callback(err, null);
    });
  } else {
    if (orderBy)
      selectQuery += ` ORDER BY ${orderBy}`;
    if (data.limit)
      selectQuery += ` LIMIT ${data.limit}`;
    if (data.offset)
      selectQuery += ` offset ${data.offset}`;

    if (data.show_query)
      return callback('', selectQuery);

    dbQuery(selectQuery, '', function (err, res) {
      return callback(err, res);
    });
  }
};

/**
* Function used to delete data from table -- Binod
* @param data  - array of object and each object containing table, query key for forming query
* @param callback  - callback function
* @return
*/
var remove = async function (data, callback) {
  let deleteSqlQuery = '', deletedRecords = [];
  await Promise.all(data.map(async (row) => {
    let table = row.table, query = row.query;
    // get records for same query before delete  
    let getDataRecords = await new Promise((resolve, reject) => {
      get(row, function (err, response) {
        resolve(response)
      });
    });
    deletedRecords.push(getDataRecords);

    // make delete query syntax
    let deleteQuery = `DELETE FROM ${table}`;
    // get where condition query from function
    let whereCondition = whereQueryFormation(query);
    if (whereCondition) {
      // make delete query with where condition
      deleteQuery = `${deleteQuery} WHERE ${whereCondition}`;
    }
    deleteSqlQuery += `${deleteQuery};`;
  }));

  if (deletedRecords.length)
    deletedRecords = [].concat.apply([], deletedRecords);
  // execute delete query and return affected rows as callback 
  dbQuery(deleteSqlQuery, '', function (err, res) {
    callback(err, deletedRecords);
  });

};

/** -- Binod
 * Function used to form update SET query like 
 * SET field1 = new-value1, field2 = new-value2 
 * @param inputObject  - object data containing table fields and values
 * @param callback  - callback function
 * @return
 */
var setQueryFormation = function (inputObject) {
  let string = '';
  if (inputObject) {
    for (const [key, value] of Object.entries(inputObject)) {
      let fieldValue = (typeof (value) == 'string') ? `'${value}'` : value;
      string += `${key} = ${fieldValue} , `;
    }
    return (string.replace(/,\s*$/, "")); // remove last comma
  }
  return '';
};

//it manipulate value on mysql format query string 
let operatorSyntax = {
  in: function (fieldValue) {
    // check first value from array which is number or not
    let firstVal = fieldValue[0];
    if (typeof firstVal === 'number') {
      fieldValue = fieldValue.toString()
    } else {
      fieldValue = fieldValue.toString();
      // make value as string and wrap with single quote
      fieldValue = fieldValue.split(',').map(function (word) {
        return "'" + word.trim() + "'";
      }).join(',');
    }
    return `(${fieldValue})`;
  },
  notin: function (fieldValue) {
    let firstVal = fieldValue[0];
    if (typeof firstVal === 'number') {
      fieldValue = fieldValue.toString()
    } else {
      fieldValue = fieldValue.toString()
      fieldValue = fieldValue.split(',').map(function (word) {
        return "'" + word.trim() + "'";
      }).join(',');
    }
    return `(${fieldValue})`;
  },
  between: function (fieldValue) {
    return `${fieldValue[0]} AND ${fieldValue[1]}`;
  },
  notbetween: function (fieldValue) {
    return `${fieldValue[0]} AND ${fieldValue[1]}`;
  },
  is: function (fieldValue) {
    return `${fieldValue}`;
  },
  isnot: function (fieldValue) {
    return `${fieldValue}`;
  },
  find_in_set: function (fieldValue) {
    return `${fieldValue}`;
  }
};

/** 
 * Function used to generate nested query syntax from respected data -- Binod 
 * @param nestData  - array of object and each object containing table, query key for forming query 
 * @return
 */
var nestQueryFormation = function (nestDataObj) {
  // get condition for query from nestData object 
  let nestCondition = nestDataObj.condition;
  // get nestData as array from nestData object 
  let nestData = nestDataObj.nest;
  let nestQuery = '', nestInc = 0;
  if (Array.isArray(nestData) && nestData.length) {
    nestData.forEach(function (obj) {
      let whereCondition = '', num = 0;

      obj.query.forEach(function (obj) {
        let fieldName = Object.keys(obj)[0];
        let fieldValue = obj[Object.keys(obj)[0]];
        let configOperators = config.operators;
        let operator = (obj.operator) ? (configOperators[obj.operator] ? configOperators[obj.operator] : obj.operator) : configOperators['='];
        let conditionValue = (obj.condition) ? obj.condition : 'AND';

        let formedFieldValue = (typeof (fieldValue) == 'string') ? ((obj.string == false) ? fieldValue : `'${fieldValue}'`) : fieldValue;

        // if in, notin, between coming as operator etc, make value to respected format//
        if (operatorSyntax[obj.operator]) {
          formedFieldValue = operatorSyntax[obj.operator](fieldValue);
        }

        let whereConditionTemp = ` ${fieldName} ${operator} ${formedFieldValue} `;
        whereCondition += (num == 0) ? ` (${whereConditionTemp})` : ` ${conditionValue} (${whereConditionTemp})`;
        num++;
      });

      // AND OR prepend on query by nestCondition if looping more than 1 
      nestQuery += (nestInc == 0) ? ` (${whereCondition})` : ` ${nestCondition} (${whereCondition})`;
      nestInc++;
    });
  }
  return nestQuery;
};

/** 
 * Function used to generate where query syntax from respected array data -- Binod 
 * @param query  - array of object and each object containing fields, value, operators
 * @return
 */
var whereQueryFormation = function (query) {
  let whereCondition = '', num = 0;
  if (Array.isArray(query) && query.length) {
    query.forEach(function (obj) {
      let fieldName = Object.keys(obj)[0];
      let fieldValue = obj[Object.keys(obj)[0]];
      let configOperators = config.operators;
      let operator = (obj.operator) ? (configOperators[obj.operator] ? configOperators[obj.operator] : obj.operator) : configOperators['='];
      let conditionValue = (obj.condition) ? obj.condition : 'AND';
      let customValue = (obj.custom) ? obj.custom : '';
      // check if field value string & string false condition for make query without single quote
      let formedFieldValue = (typeof (fieldValue) == 'string') ? ((obj.string == false) ? fieldValue : `'${fieldValue}'`) : fieldValue;

      // if in, notin, between coming as operator etc, make value to respected format//
      if (operatorSyntax[obj.operator]) {
        formedFieldValue = operatorSyntax[obj.operator](fieldValue);
      }

      let whereConditionTemp;
      if (operatorSyntax[obj.operator] && operator == 'FIND_IN_SET') {
        whereConditionTemp = ` FIND_IN_SET('${formedFieldValue}',${fieldName}) > 0 `;
      } else {
        whereConditionTemp = ` ${fieldName} ${operator} ${formedFieldValue} `;
      }

      if (customValue)
        whereConditionTemp += ` ${customValue} `;

      // check nest condition and form query respected data//
      let andNestCondition = obj.and;
      if (andNestCondition) {
        let nestedQuery = nestQueryFormation(andNestCondition);
        whereConditionTemp += ` AND (${nestedQuery}) `;
      }

      whereCondition += (num == 0) ? `(${whereConditionTemp})` : ` ${conditionValue} (${whereConditionTemp})`;

      num++;
    });
  }
  return whereCondition;
};

/** 
 * Function used to generate join query syntax from respected array data -- Binod 
 * @param joinQueryData  - array of object and each object containing fields, value, operators
 * @return
 */
var joinQueryFormation = function (joinQueryData) {
  if (typeof (joinQueryData) == 'string')
    return ` ${joinQueryData} `;

  let joinQuery = '';
  for (let dataObj of joinQueryData) {
    let type = dataObj.type, baseTable = dataObj.table, baseColumn = dataObj.column,
      withTable = dataObj.with_table, withColumn = dataObj.with_column;
    // make join query like: JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
    joinQuery += ` ${type} ${baseTable} ON  ${withTable}.${withColumn}=${baseTable}.${baseColumn} `;
  }

  return joinQuery;
};

/** 
 * Function used to get primary key from table -- Binod 
 * @param data  - object containing table name
 * @param callback  - callback function
 * @return
 */
var findPrimaryKey = function (data, callback) {
  //creating query data object for get primary key from table
  let queryData = {
    'table': 'information_schema.tables as tab',
    'select': 'sta.column_name, tab.table_name',
    'query': [
      { 'tab.table_schema': config.MYSQL_DATABASE },
      { 'tab.table_type': 'BASE TABLE', 'condition': 'AND' },
      { 'tab.table_name': data.table, 'condition': 'AND' },
    ],
    'join': "join information_schema.statistics as sta on sta.table_schema = tab.table_schema and sta.table_name = tab.table_name and sta.index_name = 'primary'"
  };
  get(queryData, function (err, response) {
    callback(err, response[0].column_name);
  });
}

module.exports = {
  init: init,
  dbQuery: dbQuery,
  createCollection: createCollection,
  listCollections: listCollections,
  get: get,
  remove: remove,
  saveData: saveData,
  insert: insert,
  update: update,
  findPrimaryKey: findPrimaryKey
}
