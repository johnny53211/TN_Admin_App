// ========================================
/* 
   Author       : Johnson R 
   Created Date : 
   updated Date :
   Description  : config Of vault setup app
*/
// ========================================
'use strict';
let config = {
    PORT: 4000,
    serviceUrl: 'http://192.168.80.70:5000',
    userStatuses: {
        "0": "Account is deactivated, Contact Administrator",
        "401": "Invalid Username or Password."
    },
    linkAccountStatus: {
        0: 'User not linked',
        401: 'Required all Fields',
        503: 'failed',
        403: 'Already exist',
        404: "Not Found"
    }
}