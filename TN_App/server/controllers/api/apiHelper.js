/**
 * @author Johnson R.
 * @description Helpers for module routes
 */
const config = require('../../config/config');
const utils = require('../utils/utils');
const path = require('path');
const databaseHelper = require('../../models/databaseHelper/databaseHelper');
const schema = require('../../models/databaseHelper/schema');
let registerUser = schema.register_users,
    employeeList = schema.regsiter_employee,
    employeeAttendance = schema.emp_attendance,
    employeePresonalDetails = schema.employee_details,
    employeeContact = schema.emp_contact,
    employeeAdharDetails = schema.emp_adhar_details,
    eventDataSchema = schema.getEventData,
    empFoodPreference = schema.getEmpFoodPreference,
    resMsg, postedData;

const apiHelper = {
    "registerUsers": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'register_users', req['body']);
        let adminIsExist = await apiHelper.getUsers(postedData['username']);
        if (Object.keys(adminIsExist).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['USER_EXIST']);
            res.send(resMsg);
        } else {
            let postValue = {};
            postValue.type = registerUser.tableName;
            postValue.body = [postedData];
            let insertResponse = await new Promise((resolve, reject) => {
                databaseHelper.saveRecord(postValue, '', function (response) {
                    resolve(response)
                });
            });
            insertResponse && insertResponse.length ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED']) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
            res.send(resMsg);
        }
    },
    "getUsers": async (userName, tableName) => {
        let query = [{ [registerUser.fields.username]: userName }];
        let options = {
            table: tableName || registerUser.tableName,
            query: query
        };
        return new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response[0] || {});
            });
        });
    },
    "login": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'register_users', req['body']);
        let response = await apiHelper.getUsers(postedData['username']);
        if (Object.keys(response).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], response);
            res.send(resMsg);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    },
    "registerEmployees": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'regsiter_employee', req['body']);
        let postValue = {};
        postValue.type = employeeList.tableName;
        postValue.body = [postedData];
        let insertResponse = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response) {
                resolve(response)
            });
        });
        insertResponse && insertResponse.length ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED'], insertResponse) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
        res.send(resMsg);
    },
    "addAttendance": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'emp_attendance', req['body']);
        let isAttendanceExist = await apiHelper.getAttendance(postedData);
        if (isAttendanceExist && isAttendanceExist.length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['ATTENENDANCE_EXIST']);
            return res.send(resMsg);
        }
        let postValue = {};
        postValue.type = employeeAttendance.tableName;
        postValue.body = [postedData];
        let insertResponse = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response) {
                resolve(response)
            });
        });
        insertResponse && insertResponse.length ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED'], insertResponse) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
        res.send(resMsg);
    },
    "getAttendance": (data, tableName = '') => {
        let { month, day, year, emp_code } = data
        let query = [{ [employeeAttendance.fields.emp_code]: emp_code }];
        // check pin is getting add one more query
        if (month) {
            query.push({ [employeeAttendance.fields.month]: month });
        }
        if (day) {
            query.push({ [employeeAttendance.fields.day]: day });
        }
        if (year) {
            query.push({ [employeeAttendance.fields.year]: year });
        }
        let options = {
            table: tableName || employeeAttendance.tableName,
            query: query
        };
        return new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
    },
    "addEmpDetails": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'employee_details', req['body']);
        let isData = await apiHelper.getAttendance(postedData, 'emp_personal_details')
        if (Object.keys(isData).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['USER_EXIST']);
            return res.send(resMsg);
        }
        let postValue = {};
        postValue.type = employeePresonalDetails.tableName;
        postValue.body = [postedData];
        let insertResponse = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response, err) {
                if (err)
                    reject(err)
                resolve(response)
            });
        });
        if (insertResponse && insertResponse.length) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED'], insertResponse);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR'])
        }
        res.send(resMsg);
    },
    "insertContact": async (postValue) => {
        let response = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response, err) {
                resolve(response)
            });
        })
        return response
    },
    "updateEmpDetails": async (req, res) => { // not Finish
        postedData = utils.schemaFieldsMapping(schema, 'employee_details', req['body']);
        let isData = await apiHelper.getAttendance(postedData, 'employee_details')
        if (!Object.keys(isData).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['USER_EXIST']);
            return res.send(resMsg);
        }
        let postValue = {};
        postValue.type = employeePresonalDetails.tableName;
        postValue.body = [postedData];
        let insertResponse = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response, err) {
                if (err)
                    reject(err)
                resolve(response)
            });
        });
        if (insertResponse && insertResponse.length) {
            postValue.type = employeeContact.tableName;
            postedData = utils.schemaFieldsMapping(schema, 'emp_contact', req['body']);
            postValue.body = [postedData];
            let insertContact = await apiHelper.insertContact(postValue);
            if (insertContact && insertContact.length > 0) {
                postValue.type = employeeAdharDetails.tableName;
                postedData = utils.schemaFieldsMapping(schema, 'emp_adhar_details', req['body']);
                postValue.body = [postedData];
                let insertAdhar = await apiHelper.insertContact(postValue);
                insertAdhar && insertAdhar.length ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED'], { insertResponse, insertAdhar, insertContact }) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
            } else {
                resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR'])
            }
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR'])
        }
        res.send(resMsg);
    },
    "getEmpAttendance": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'emp_attendance', req['body']);
        let response = await apiHelper.getAttendance(postedData);
        if (Object.keys(response).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], response);
            res.send(resMsg);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    },
    "getAllEmpDetails": async (req, res) => {
        postedData = req.body;
        let getResponse = await apiHelper.getEmpDetails(postedData);
        getResponse && getResponse.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], getResponse) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
        res.send(getResponse);
    },
    "getEmpDetails": async (reqQuery, empCode, tableName) => {
        let queryArray = [];
        let query = reqQuery,
            options;
        let { emp_code, mail_id } = reqQuery;
        if (emp_code)
            queryArray.push({ ['emp_personal_details.emp_code']: emp_code });
        // check pin is getting add one more query
        if (mail_id) {
            queryArray.push({ ['emp_personal_details.mail_id']: mail_id });
        }
        let join = [{
            'type': 'LEFT JOIN',
            'table': 'gender',
            'column': 'id',
            'with_table': 'emp_personal_details',
            'with_column': 'gender'
        }, {
            'type': 'LEFT JOIN',
            'table': 'team',
            'column': 'id',
            'with_table': ' emp_personal_details',
            'with_column': 'team'
        }]
        options = {
            table: employeePresonalDetails['tableName'],
            query: queryArray,
            limit: query.length || "",
            join: join
        };
        let and;
        if (query && query.search && query.search.value) {
            and = {
                condition: "OR",
                nest: [
                    {
                        query: [
                            {
                                gender: `%${query.search.value}%`,
                                operator: "like",
                                condition: "OR",
                            },
                            {
                                mail_id: `%${query.search.value}%`,
                                operator: "like",
                                condition: "OR",
                            },
                            {
                                emp_code: `%${query.search.value}%`,
                                operator: "like",
                                condition: "OR",
                            },
                        ],
                    },
                ],
            };
        }
        //console.log( query.search.value);
        if (query && query.search && query.search.value) {
            queryArray.push({ emp_code: 0, operator: "!=", and });
        }
        let totalCount = 0;
        if (query.count) {
            totalCount = await new Promise((resolve, reject) => {
                options.limit = "";
                options.count = true;
                databaseHelper.getRecord(options, async function (response) {
                    resolve(response);
                });
            });
        }
        // options reset for complete data
        options.limit = query.length || "";
        options.offset = query.start;
        options.count = false;
        if (query.select) {
            options.select = query.select;
        }
        let getResponse = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, async function (response) {
                console.log(response);
                let errMsg =
                    response && Object.keys(response).length === 0
                        ? config['response']['messages']['error']['TYPE_ERROR']
                        : config['response']['messages']['success']['CODE_SUCCESS'];
                let resMsg = utils.generateResponse(
                    config['response']['statusCodes']['OK'],
                    config['response']['messages']['success']['CODE_SUCCESS'],
                    {
                        status: config['response']['statusCodes']['OK'],
                        message: errMsg,
                        total_record: totalCount,
                        data: response,
                    }
                );
                resolve(resMsg)
            });
        })
        return getResponse;
    },
    "getEventList": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'getEventData', req['body']);
        if ((postedData && postedData['event_type']) || postedData && postedData['event_name']) {
            postedData['event_date'] = utils.getCuurentMonth();
            let getEventdata = await apiHelper.getEventData(postedData)
            Object.keys(getEventdata).length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], getEventdata) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    },
    "getEventData": async (data, tableName) => {
        let { event_date, event_name, event_type } = data || {};
        let query = [];

        // Constructing query for full month celebrations
        if (event_name) query.push({ [eventDataSchema.fields.event_name]: event_name, condition: "And" });
        if (event_type) {
            query.push({ [eventDataSchema.fields.event_type]: event_type, condition: "AND" });
        }
        if (event_date) query.push({ [eventDataSchema.fields.event_date]: `%${event_date}%`, condition: "OR", operator: "like" });

        let options = {
            table: tableName || eventDataSchema.tableName,
            query: query
        };

        // Retrieving full month celebrations
        let fullMonthCelebrationPromise = new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || {});
            });
        });

        // Constructing query for month birthdays
        query = [];
        if (event_type) {
            query.push({ [employeePresonalDetails.fields.date_of_birth]: `%${utils.getCuurentMonth()}%`, "condition": 'AND', operator: "like" });
        }
        options.query = query;
        options.table = employeePresonalDetails.tableName;
        options.select = 'date_of_birth,team_name as team_name,emp_name as employee_name';
        options.join = [{
            'type': 'LEFT JOIN',
            'table': 'employee_details',
            'column': 'emp_code',
            'with_table': ' emp_personal_details',
            'with_column': 'emp_code'
        }, {
            'type': 'LEFT JOIN',
            'table': 'team',
            'column': 'id',
            'with_table': ' emp_personal_details',
            'with_column': 'team'
        }]
        // Retrieving month birthdays
        let monthBirthdayPromise = new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || {});
            });
        });
        return Promise.all([fullMonthCelebrationPromise, monthBirthdayPromise])
            .then(([fullMonthCelbration, getMonthBirthday]) => {
                return { getMonthBirthday, fullMonthCelbration };
            });
    },
    "getEmpGenderDetails": async (req, res) => {
        let options = {
            table: 'gender'
        }
        let genderRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || {});
            });
        });
        genderRes && genderRes.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], genderRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "addEmpFoodPreference": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'getEmpFoodPreference', req['body']);
        if (postedData && Object.keys(postedData).length > 0) {
            let isExist = {
                "emp_code": postedData['emp_code'],
                "event_date": postedData['event_date']
            }
            let { getFullPreference } = await apiHelper.getFoodPreference(isExist);
            if (getFullPreference && getFullPreference.length) {
                resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['USER_EXIST']);
                return res.send(resMsg);
            }
            let postValue = {};
            postValue.type = empFoodPreference.tableName;
            postValue.body = [postedData];
            let insertResponse = await new Promise((resolve, reject) => {
                databaseHelper.saveRecord(postValue, '', function (response, err) {
                    if (err)
                        reject(err)
                    resolve(response)
                });
            });
            insertResponse && insertResponse.length ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED']) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
            res.send(resMsg);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    },
    "getEmpFoodPreference": async (req, res) => {
        let count = req['body']['count'] || false;
        postedData = utils.schemaFieldsMapping(schema, 'getEmpFoodPreference', req['body']);
        postedData['count'] = count;
        let foodPrefRes = await apiHelper.getFoodPreference(postedData)
        foodPrefRes && Object.keys(foodPrefRes).length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], foodPrefRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "getFoodPreference": async (args = {}) => {
        let { food_type, emp_code, event_name, event_date, table, count } = args;
        let query = []
        if (food_type) query.push({ [`fp.${schema['getEmpFoodPreference']['fields']['food_type']}`]: food_type });
        if (emp_code) query.push({ [`fp.${schema['getEmpFoodPreference']['fields']['emp_code']}`]: emp_code });
        if (event_date) query.push({ [`fp.${schema['getEmpFoodPreference']['fields']['event_date']}`]: event_date });
        if (event_name) query.push({ [`fp.${schema['getEmpFoodPreference']['fields']['event_name']}`]: event_name });
        let join = [
            {
                'type': 'LEFT JOIN',
                'table': 'food_type',
                'column': 'food_id',
                'with_table': 'fp',
                'with_column': schema['getEmpFoodPreference']['fields']['food_type']
            },
            {
                'type': 'LEFT JOIN',
                'table': 'yes_no_table',
                'column': 'id',
                'with_table': 'fp',
                'with_column': schema.getEmpFoodPreference.fields.attend
            }
        ];
        let options = {
            table: table || `${schema['getEmpFoodPreference']['tableName']} fp`,
            query: query,
            join, join,
        }

        let totalFoodCount = {};
        if (count && !emp_code) {
            let queryArray = [];
            if (event_date) queryArray.push({ [`fp.${schema['getEmpFoodPreference']['fields']['event_date']}`]: event_date });
            totalFoodCount.select = 'COUNT(*), fp.food_type, fp.attend, SUM(fp.no_members) AS total_members'
            totalFoodCount.table = `${schema['getEmpFoodPreference']['tableName']} fp`
            totalFoodCount.group_by = "fp.food_type, fp.attend";
            totalFoodCount.query = queryArray
        }
        let getFullPreference = new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || (response && response[0]) || {});
            });
        });

        let getFoodCount = new Promise((resolve, reject) => {
            databaseHelper.getRecord(totalFoodCount, function (response) {
                if (response == null) resolve(null);
                else
                    resolve(response || {});
            });
        });
        return Promise.all([getFullPreference, getFoodCount])
            .then(([getFullPreference, getFoodCount]) => {
                return { getFullPreference, getFoodCount };
            });
    },
    "getEmpTeamDetails": async (req, res) => {
        let options = {
            table: 'team'
        }
        let teamDetailsRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
        teamDetailsRes && teamDetailsRes.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], teamDetailsRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "getEmpResponse": async (req, res) => {
        let options = {
            table: 'yes_no_table'
        }
        let empRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
        empRes && empRes.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], empRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "addEventsData": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'getEventData', req['body']);
        let event_date = postedData['event_date']
        delete postedData.event_date;
        let { fullMonthCelbration } = await apiHelper.getEventData(postedData);
        let postValue = {};
        postValue.type = eventDataSchema.tableName;
        postedData.event_date = event_date;
        postValue.body = [postedData];
        if (fullMonthCelbration.length > 0) {
            let { event_name, event_date } = postedData;
            let query = [];
            if (event_name)
                query.push({ [eventDataSchema.fields.event_name]: event_name, condition: 'or' });
            // check pin is getting add one more query
            postValue.data = [postedData];
            let updateResponse = await new Promise((resolve, reject) => {
                databaseHelper.saveRecord(postValue, query, function (response) {
                    resolve(response)
                });
            });
            updateResponse == 1 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_UPDATED'], updateResponse) : utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['OTHER_ERROR'])
        } else {
            let insertResponse = await new Promise((resolve, reject) => {
                databaseHelper.saveRecord(postValue, '', function (response) {
                    resolve(response)
                });
            });
            insertResponse && insertResponse.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_CREATED'], insertResponse) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['CODE_ERROR'])
        }
        res.send(resMsg)
    },
    "deleteEmpDetails": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'employee_details', req['body']);
        let postValueEmpPersonal = {};
        let query = [];
        postValueEmpPersonal['table'] = employeePresonalDetails.tableName;
        if (postedData && postedData['emp_code'])
            query.push({ [employeePresonalDetails.fields['emp_code']]: postedData['emp_code'] })
        postValueEmpPersonal['query'] = query;
        let deleteData = [postValueEmpPersonal]
        let deleteResponse = await new Promise((resolve, reject) => {
            databaseHelper.deleteRecord(deleteData, function (response) {
                resolve(response)
            })
        })
        deleteResponse && deleteResponse.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_DELETED']) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "sendMail": async (req, res) => {
        try {
            await nodeMailer.sendMail()
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = apiHelper;