// ========================================
/* Author       : Johnson R 
   Created Date : 
   Edited Date  :
   Description  : Custom Dialog of framework 7 
*/
// ========================================
'use strict';
let notification = {
    notification: app.notification,
    notificationType: ['create'], // allowed notification type 
    // custom dialog for all type of dialog
    "customNotification": (args) => {
        if (notification.notificationType.includes(args.type)) {
            let getNotification = notification.notification[args.type]({
                icon: args.icon || '',
                title: args.title || 'Vault Setup',
                titleRightText: args.titleRightText || '',
                subtitle: args.subtitle || '',
                text: args.text || '',
                closeButton: args.closeButton || false,
                closeTimeout: args.closeTimeout || 3000,
                closeOnClick: args.closeOnClick || false,
                swipeToClose: args.swipeToClose || true,
                on: args.on || {}
            })
            getNotification.open()
        }
    }
};