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
                "url": "upcomingFunctions/1",
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
                "url": "upcomingFunctions/2",
                "divId": "upcomingTounamentsOne",
                "class": "item-link item-content",
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
        template.renderTemplate(`#leftPanelTemplate`, '#leftPanelRender', utils["leftPanel"], '', 1)
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
            appService.preLoaderHide();
            let formData = app.form.convertToData('#form-data');
            let { time, date } = utils.convertDateAndTime(formData['event_date']);
            formData['event_date'] = date;
            formData['event_time'] = time;
            appService.preLoaderShow();
            await appService.addEvents(formData);
            let data = { "select": "emp_code,mail_id" };
            let getEmpResponse = await appService.getEmpDetails(data);
            if (getEmpResponse && getEmpResponse['data'].length > 0) {
                appService.preLoaderShow('Sending Mail ....');
                for (let i = 0; i < getEmpResponse['data'].length; i++) {
                    try {
                        let shareUrl = `&emp_id=${getEmpResponse['data'][i]['emp_code']}&event_date=${date}&event_name=${formData['event_name']}`
                        let urlData = {
                            shareUrl: shareUrl,
                            secret: 'events'
                        };
                        let getUrl = utils.encryptData(urlData);
                        let dataString = {
                            eventsUrl: getUrl,
                            mailReceiver: getEmpResponse['data'][i]['mail_id']
                        }
                        let args = {
                            method: "post",
                            url: apiUrl['sendMail'],
                            dataString: dataString,
                        }
                        await loginService.callAPI(args); // Wait for the AJAX call to complete
                    } catch (err) {
                        appService.preLoaderHide()
                        console.log(err); // Handle errors if needed
                    }
                }
                appService.preLoaderHide();
            }
        }
    },
    deleteEmp: async (e) => {
        let emp_code = e.dataset['emp_code'];
        if (emp_code) {
            let dialogArgs = {
                type: 'confirm',
                title: "Are You Sure Delete ?",
                text: "TN Admin",
                callbackOk: async () => {
                    await appService.deleteEmpDetails(e.dataset);
                }
            }
            dialog.customDialog(dialogArgs)
        }
    },
    getFoodCount: async (eventDate, eventName) => {
        const list = [];
        let templateData = [];
        let { getFoodCount } = await appService.getFoodType({
            "event_date": eventDate,
            "count": true
        });
        let vegTotal = 0;
        let nonVegTotal = 0;

        getFoodCount.forEach(item => {
            if (item.food_type === 1) {
                vegTotal += item.total_members;
            } else if (item.food_type === 2) {
                nonVegTotal += item.total_members;
            }
        });

        const templateDataObj = {
            "event_name": eventName,
            "veg": vegTotal,
            "nonveg": nonVegTotal,
            "total": vegTotal + nonVegTotal
        };
        list.push(templateDataObj);
        templateData['list'] = list;
        $('.popupTitle').text('Food Count :');
        template.renderTemplate('#tableTemplate', '.popupContent', templateData, '', 1)
    },
    addEmpDetails: (e) => {
        utils.popupOpen('.my-popup');
        let popup = utils.popupGet('.my-popup');
        $(popup.$el).find('.popupTitle').html('Add Employee');
        let formContent = {
            "list": [
                {
                    "name": "Emp Code",
                    "type": "text",
                    "placeHolder": "Employee code",
                    "nameValue": "emp_code"
                },
                {
                    "name": "Employee Name",
                    "type": "text",
                    "placeHolder": "Enter Employee Name",
                    "nameValue": "emp_name"
                },
                {
                    "name": "Father Name",
                    "type": "text",
                    "placeHolder": "Enter Father Name",
                    "nameValue": "father_name"
                },
                {
                    "name": "Mother Name",
                    "type": "text",
                    "placeHolder": "Enter Mother Name",
                    "nameValue": "mother_name"
                },
                {
                    "name": "Designation",
                    "type": "text",
                    "placeHolder": "Enter Designation",
                    "nameValue": "designation"
                },
                {
                    "name": "Address",
                    "type": "text",
                    "placeHolder": "Enter Address",
                    "nameValue": "address"
                },
                {
                    "name": "Gender",
                    "nameValue": "gender",
                    "select": [{
                        "event_type": "Male",
                        "value": 1
                    }, {
                        "event_type": "Female",
                        "value": 2
                    }],
                    "placeHolder": "Enter Gender"
                },
                {
                    "name": "Date Of Joining",
                    "type": "date",
                    "placeHolder": "Enter date",
                    "nameValue": "date_of_joining"
                },
                {
                    "name": "Blood",
                    "type": "text",
                    "placeHolder": "Enter Blood Group",
                    "nameValue": "blood_group"
                },
                {
                    "name": "Date Of Birth",
                    "type": "date",
                    "placeHolder": "Enter Blood Group",
                    "nameValue": "date_of_birth"
                },
                {
                    "name": "Team",
                    "nameValue": "team",
                    "select": [{
                        "event_type": "Maxval",
                        "value": 2
                    }, {
                        "event_type": "Vectre",
                        "value": 1
                    }, {
                        "event_type": "Buildtrack",
                        "value": 3
                    }
                    ],
                    "placeHolder": "Enter Team"
                },
                {
                    "name": "Employee Mail",
                    "type": "email",
                    "placeHolder": "Enter Employee Mail",
                    "nameValue": "mail_id"
                },
            ]
        }
        let content = template.renderTemplate('#formtemplate', '', formContent);
        let templateData = {
            "content": content,
            "clickEvent": "homeTab.addEmpSubmit",
            "btnName": "Add Employee"
        }
        template.renderTemplate('#popupForm', '.popupContent', templateData, '', 1);
    },
    addEmpSubmit: (e) => {
        event.preventDefault();
        let validateForms = $("#form-data").valid();
        if (validateForms) {
            appService.preLoaderShow();
            let formData = utils.getFormData('#form-data');
            appService.addEmpDetails(formData);
        }
    }
}
let id, dataName;
$(document).ready(async function () {
    // accessing template files and json files -- start
    await template.accessFile('./assets/template/template.html');
    // accessing template files and json files -- end
    // check session 
    loginService.checkSession();
    formValidationn.validateIp();
    utils.showLoginName();
    homeTab.homeRenderBtn();
    utils.serachBarList()
    await Promise.all([appService.getGender(), appService.getTeamList()]);
});

$(document).on('page:init', async function (e, page) {
    formValidationn.validateLoginForm();
    utils.showLoginName();
    homeTab.homeRenderBtn();
    utils.serachBarList();
});
$(document).on('popup:opened', function () {
    formValidationn.validatePopupForm()
})

