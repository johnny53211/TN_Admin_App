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
    "insertContact": async (postValue) => {
        let response = await new Promise((resolve, reject) => {
            databaseHelper.saveRecord(postValue, '', function (response, err) {
                resolve(response)
            });
        })
        return response
    },
    "updateEmpDetails": async (req, res) => {
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
        postedData = utils.schemaFieldsMapping(schema, 'employee_details', req['body']);
        let getResponse = await apiHelper.getEmpDetails(postedData);
        getResponse && getResponse.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], getResponse) : resMsg = utils.generateResponse(config.response.statusCodes['SERVER_ERROR'], config.response.messages.error['OTHER_ERROR']);
        res.send(resMsg);
    },
    "getEmpDetails": (data, tableName) => {
        let { emp_code, mail_id } = data
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
        let query = [];
        if (emp_code)
            query.push({ ['emp_personal_details.emp_code']: emp_code });
        // check pin is getting add one more query
        if (mail_id) {
            query.push({ ['emp_personal_details.mail_id']: mail_id });
        }
        let options = {
            table: tableName || employeePresonalDetails.tableName,
            query: query,
            join
        };
        return new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
    },
    "getEventList": async (req, res) => {
        let options = {
            table: 'events'
        }
        let genderRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
        genderRes && genderRes.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], genderRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "getEmpGenderDetails": async (req, res) => {
        let options = {
            table: 'gender'
        }
        let genderRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
        genderRes && genderRes.length > 0 ? resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], genderRes) : resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
        res.send(resMsg);
    },
    "getEmpFoodPreference": async (req, res) => {
        let options = {
            table: 'food_type'
        }
        let foodPrefRes = await new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
        if (foodPrefRes) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], foodPrefRes);
            res.send(resMsg);
        }
        else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
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
        if (teamDetailsRes) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], teamDetailsRes);
            res.send(resMsg);
        }
        else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
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
        if (empRes) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], empRes);
            res.send(resMsg);
        }
        else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    }
}

module.exports = apiHelper;