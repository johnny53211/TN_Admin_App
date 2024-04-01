// ========================================
/* Author       : Johnson R 
   Created Date : 
   Edited Date  :
   Description  : Custom Dialog of framework 7 
*/
// ========================================
'use strict';
let dialog = {
    dialog: app.dialog,
    verticalButtons: false,
    dialogType: ['alert', 'password', 'login', 'prompt', "confirm"], // allowed dialog type 
    // custom dialog for all type of dialog
    "customDialog": (args) => {
        if (dialog.dialogType.includes(args.type)) {
            dialog.dialog[args.type](args.title, args.text, args.callbackOk)
        }
        else {
            // button length is greather 3 change vertical buttons
            if (args.buttons.length > 3)
                dialog.verticalButtons = true
            let appDialog = dialog.dialog[args.type]({
                title: args.title,
                content: args.content,
                buttons: args.buttons,
                preventClose: false,
                verticalButtons: dialog.verticalButtons,
                on: {
                    open: function () {
                        // validate dialog inputs 
                        formValidationn.validateDialogInputs();
                    }
                }
            });
            appDialog.open();
            dialog.verticalButtons = false;
        }
    }
};

