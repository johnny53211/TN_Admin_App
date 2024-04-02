// ========================================
/* 
   Author       : Johnson R 
   Created Date : 
   Edited Date  :
   Description  : Home Page Scripts
*/
// ========================================
'use strict';
let dialogArgs;
let homeTab = {
    // loginForm JSON
    'loginFormJson': [
        {
            "title": "Username",
            "placeHolderData": "Enter Username",
            "nameValue": "username",
            "typeVal": "text",
            "idVal": "linkUserName"
        },
        {
            "title": "Password",
            "placeHolderData": "Enter Password",
            "nameValue": "password",
            "idVal": "password",
            "typeVal": "password",
        }
    ],
    "homeButtonJson": [
        {
            "title": "Employee",
            "id": "employee",
            "url": "employee",
            "clickEvent": "",
            "classButton": "col button button-fill button-round",
            "anchorClass": "button button-fill",
            "name": "employee"
        },
        {
            "title": "Events",
            "id": "events",
            "url": "events",
            "clickEvent": "",
            "classButton": "col button button-fill button-round",
            "anchorClass": "button button-fill",
            "name": "events"
        }
    ],
    homeTabShow: () => {
        loginService.redirect('/', {
            reloadAll: true
        });
    },
    // check login user is authorize 
    loginConfirmation: () => {
        let validateForms = $("#loginForm").valid();
        if (validateForms) {
            appService.preLoaderShow();
            loginService.processLogin();
        }
    },
    homeRenderBtn: () => {
        template.renderTemplate('#homeButton', '#homeRender', homeTab['homeButtonJson'], '', 1);
    }
}
let id,
    dataName;
$(document).ready(async function () {
    // accessing template files and json files -- start
    await template.accessFile('./assets/template/template.html');
    // accessing template files and json files -- end
    // check session 
    loginService.checkSession();
    formValidationn.validateIp();
    utils.showLoginName();
    homeTab.homeRenderBtn();
});

$(document).on('page:init', function (e) {
    formValidationn.validateLoginForm();
    formValidationn.validateRegisterForm()
    utils.showLoginName();
    homeTab.homeRenderBtn();
});
