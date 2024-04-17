
const response = {
    mailDomain: 'http://192.168.80.52/bt-project/TN_Admin_App/TN_APP_Web/',
    PORT: 5000,
    messages: {
        error: {
            USER_EXIST: "Already Exist",
            TOKEN_INVALID: "Invalid Token",
            AUTH_MSG: 'Invalid Authentication Key',
            APPID_MSG: 'Invalid Combination of API Key and Application',
            REQDATA_MSG: 'Request data is required',
            OTHER_ERROR: 'Failed',
            TYPE_ERROR: 'Notification type is not valid for app',
            NO_SETTING: 'Setting data not exist for app',
            USER_LINKED: 'User not linked',
            CODE_ERROR: 0,
            ATTENENDANCE_EXIST: "Attendance already exist"
        },
        success: {
            TOKEN_VALID: "Valid Authentication Key",
            SUCCESS_MESSAGE: 'Success',
            RECORD_CREATED: 'Record created successfully',
            RECORD_LISTED: 'Ok',
            RECORD_UPDATED: 'Record updated successfully',
            RECORD_DELETED: 'Record deleted successfully',
            EMPTY_DATA: 'No Data Found',
            USER_LINKED: 'User linked',
            CODE_SUCCESS: 1,
        }
    },
    statusCodes: {
        'FAILED_TOKEN': 404,
        'OK': 200,
        'AUTH_ERROR': 401,
        'SERVER_ERROR': 500,
        'SERVICE_ERROR': 503,
        "ALREADY_EXIST": 403
    }
}
module.exports = { response }
