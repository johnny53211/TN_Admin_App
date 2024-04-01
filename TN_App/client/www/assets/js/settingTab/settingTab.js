// ========================================
/* Author       : Johnson R 
   Created Date : 
   Edited Date  :
   Description  : Setting Tab functionalities
*/
// ========================================
'use strict';
let settingTab = {
    "settingsJson": {
        "dataName": "settingsPage",
        "classVal": "page page-with-subnavbar",
        "ulId": "settingUl",
        "pClass": "displayNone",
        "titleClass": "settingTitle",
        "list": [
            {
                "title": "Security Pin",
                "subTitle": "",
                "idValue": "createPin",
                "data": "",
                "pinCheck": "checkPin",
                "subTitleId": "createPinSub",
                "clickEvent": "settingTab.processToCreatePin()",
                "divId": "CreatePinDiv",
                "class": "item-link item-content"
            },
            {
                "title": "Verify Pin",
                "subTitle": "",
                "idValue": "verifyPin",
                "pinCheck": "checkPin",
                "data": "",
                "subTitleId": "verifyPinSub",
                "clickEvent": "settingTab.verifyPin()",
                "divId": "verifyPinDiv",
                "class": "item-link item-content"
            },
            {
                "title": "Logout",
                "subTitle": "",
                "idValue": "logout",
                "data": "",
                "subTitleId": "logoutSub",
                "clickEvent": "settingTab.logout()",
                "divId": "logoutDiv",
                "class": "item-link item-content"
            }
        ]
    },
    "createPinDialogJson": [
        {
            "placeHolderData": "Enter Pin",
            "nameValue": "pin",
            "typeVal": "text",
            "patternValue": "[0-9]*",
            "idValue": "pin",
            "maxValue": "4",
            "minValue": "4",
            "errMessage": "",
            "errId": "pinErrMsg"
        },
        {
            "nameValue": "confirmPin",
            "placeHolderData": "Confirm Pin",
            "typeVal": "password",
            "patternValue": "[0-9]*",
            "maxValue": "4",
            "minValue": "4",
            "idValue": "confirmPin",
            "errMessage": "",
            "errId": "confirmErrMsg"
        }
    ],
    "updatePinDialogJson": [
        {
            "placeHolderData": "Current Pin",
            "nameValue": "oldPin",
            "typeVal": "text",
            "patternValue": "[0-9]*",
            "errMessage": "Only numbers please!",
            "maxValue": "4"
        },
        {
            "nameValue": "pin",
            "placeHolderData": "New Pin",
            "typeVal": "text",
            "patternValue": "[0-9]*",
            "errMessage": "Only numbers please!",
            "maxValue": "4"
        },
        {
            "nameValue": "confirmPin",
            "placeHolderData": "Confirm Pin",
            "typeVal": "password",
            "maxValue": "4",
            "patternValue": "[0-9]*",
            "errMessage": "Only numbers please!",
        }
    ],
    verifyPin: () => {
        settingTab.processToverifyPin()
    },
    // create a pin and token with button click
    processToCreatePin: () => {
        let templateHtml = template.renderTemplate('#dialogTemplate', '', settingTab['createPinDialogJson'], ''),
            button = [
                {
                    text: 'close',
                },
                {
                    text: 'ok',
                    close: true,
                    onClick: function (dialog, e) {
                        let validateInputs = $("#dialogInput").valid();
                        if (!validateInputs)
                            this.close = false;
                        else {
                            vaultService.preLoaderShow()
                            vaultService.createPin();
                        }
                    }
                }
            ];
        dialogArgs = {
            type: "create",
            content: templateHtml,
            buttons: button,
            title: 'Create Pin'
        }
        dialog.customDialog(dialogArgs);
    },
    "verifyPinDialogJson": [
        {
            "placeHolderData": "Enter Pin",
            "nameValue": "pin",
            "typeVal": "password",
            "maxValue": "4",
            "minValue": "4",
            "errMessage": "",
            "errId": "inputOneError"
        }
    ],
    // verify pin values when click action 
    processToverifyPin: (verifyFor = '') => {
        let templateHtml = template.renderTemplate('#dialogTemplate', '', settingTab['verifyPinDialogJson'], ''),
            button = [
                {
                    text: 'close',
                },
                {
                    text: 'ok',
                    close: true,
                    onClick: function () {
                        let validateInputs = $("#dialogInput").valid();
                        if (!validateInputs) {
                            this.close = false;
                        } else {
                            vaultService.preLoaderShow()
                            vaultService.verifyPin(verifyFor);
                        }
                    }
                }
            ];
        dialogArgs = {
            type: "create",
            content: templateHtml,
            buttons: button,
            action: 1,
            title: 'Verify Pin'
        }
        dialog.customDialog(dialogArgs);
    },
    logout: () => {
        dialogArgs = {
            type: 'confirm',
            title: 'Are You Sure ?',
            text: "Vault App",
            callbackOk: loginService.logout
        }
        dialog.customDialog(dialogArgs)
    }
}