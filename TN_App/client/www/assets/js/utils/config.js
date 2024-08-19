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
    PORT: 5000,
    serviceUrl: 'http://192.168.0.102',
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