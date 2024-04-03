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
    "employeePage": {
        "list": [
            {
                "title": "Employee List",
                "subTitle": "",
                "idValue": "empList",
                "data": "empList",
                "subTitleId": "",
                "url": "employeeList",
                "divId": "emplyeeOne",
                "class": "item-link item-content"
            }
        ]
    },
    "eventsList": {
        "list": [
            {
                "title": "Celebrations",
                "subTitle": "",
                "idValue": "functions",
                "data": "functions",
                "subTitleId": "",
                "url": "celebrationList",
                "divId": "functionOne",
                "class": "item-link item-content"
            },
            {
                "title": "Tournaments",
                "subTitle": "",
                "idValue": "tournaments",
                "data": "tournaments",
                "subTitleId": "",
                "url": "tournamentsList",
                "divId": "tournamentOne",
                "class": "item-link item-content"
            },
            {
                "title": "Add Events",
                "subTitle": "",
                "idValue": "addEvents",
                "data": "addEvents",
                "subTitleId": "",
                "url": "",
                "divId": "tournamentOne",
                "class": "item-link item-content",
                "liClass": "popup-open",
                "dataPopup": ".my-popup",
                "clickEvent": "homeTab.handlePopupClick",
                "dataName": "addEventPopup"
            }
        ]
    },
    "celebrationList": {
        "list": [
            {
                "title": "Upcoming Celebrations",
                "subTitle": "",
                "idValue": "upcomingFunctions",
                "data": "upcomingFunctions",
                "subTitleId": "",
                "url": "upcomingFunctions",
                "divId": "upcomingFunctionsOne",
                "class": "item-link item-content"
            },
            {
                "title": "Celebration Add",
                "subTitle": "",
                "idValue": "functionsAdd",
                "data": "functionsAdd",
                "subTitleId": "",
                "url": "functionsAdd",
                "divId": "functionsAddOne",
                "class": "item-link item-content"
            }
        ]
    },
    "tournamentsList": {
        "list": [
            {
                "title": "Upcoming Tounaments",
                "subTitle": "",
                "idValue": "upcomingTounaments",
                "data": "upcomingTounaments",
                "subTitleId": "",
                "url": "",
                "divId": "upcomingTounamentsOne",
                "class": "item-link item-content",
                "liClass": "popup-open",
                "dataPopup": ".my-popup"
            },
            {
                "title": "Tounaments Add",
                "subTitle": "",
                "idValue": "tounamentsAdd",
                "data": "tounamentsAdd",
                "subTitleId": "",
                "url": "",
                "divId": "tounamentsAddOne",
                "class": "item-link item-content",
                "liClass": "popup-open",
                "dataPopup": ".my-popup",
            }
        ]
    },
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
    },
    handlePopupClick: (element) => {
        let clickedPopup = element.dataset.name;
        homeTab[clickedPopup]();
    },
    addEventPopup: () => {
        $('.popupTitle').html('Add Events');
        let formContent = {
            "list": [
                {
                    "name": "Event Name",
                    "type": "text",
                    "placeHolder": "Enter Event",
                    "nameValue": "event_name"
                },
                {
                    "name": "Event Name",
                    "type": "datetime-local",
                    "placeHolder": "Enter Event",
                    "nameValue": "event_date"
                },
                {
                    "name": "Select Event Type",
                    "nameValue": "event_type",
                    "select": [{
                        "event_type": "Celebration",
                        "value": 1
                    }, {
                        "event_type": "Tournaments",
                        "value": 2
                    }],
                    "placeHolder": "Enter Name"
                }
            ]
        }
        let content = template.renderTemplate('#formtemplate', '', formContent);
        let templateData = {
            "content": content,
            "clickEvent": "homeTab.addEventData",
            "btnName": "Add Events"
        }
        template.renderTemplate('#popupForm', '.popupContent', templateData, '', 1)
    },
    addEventData: async (e) => {
        event.preventDefault();
        let validateForms = $("#form-data").valid();
        if (validateForms) {
            let formData = app.form.convertToData('#form-data');
            let { time, date } = utils.convertDateAndTime(formData['event_date']);
            formData['event_date'] = date;
            formData['event_time'] = time;
            appService.preLoaderShow();
            await appService.addEvents(formData)
        }
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
    await Promise.all([appService.getGender(), appService.getFoodType(), appService.getTeamList()]);
});

$(document).on('page:init', async function (e) {
    formValidationn.validateLoginForm();
    utils.showLoginName();
    homeTab.homeRenderBtn();
});
$(document).on('popup:opened', function () {
    formValidationn.validatePopupForm()

})

