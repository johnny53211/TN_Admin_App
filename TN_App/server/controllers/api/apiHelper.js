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
    "getAttendance": (data) => {
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
            table: employeeAttendance.tableName,
            query: query
        };
        return new Promise((resolve, reject) => {
            databaseHelper.getRecord(options, function (response) {
                resolve(response || response[0] || {});
            });
        });
    },
    "addEmployeeDetails": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'emp_attendance', req['body']);
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
    "getEmployeeAttendance": async (req, res) => {
        postedData = utils.schemaFieldsMapping(schema, 'emp_attendance', req['body']);
        let response = await apiHelper.getAttendance(postedData);
        if (Object.keys(response).length > 0) {
            resMsg = utils.generateResponse(config.response.statusCodes['OK'], config.response.messages.success['RECORD_LISTED'], response);
            res.send(resMsg);
        } else {
            resMsg = utils.generateResponse(config.response.statusCodes['AUTH_ERROR'], config.response.messages.error['AUTH_MSG']);
            res.send(resMsg);
        }
    }
}

module.exports = apiHelper;