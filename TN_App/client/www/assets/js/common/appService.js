'use strict';
let baseUrl = config['serviceUrl'];
let dataString;
let apiUrl = {
    "registerUser": `${baseUrl}/registerUser`,
    "loginUser": `${baseUrl}/login`
};
let appService = {
    preLoaderShow: () => {
        app.dialog.preloader('Please Wait ...');
    },// app loader hide
    preLoaderHide: () => {
        app.dialog.close();
    },
    registerUser: (data) => {
        debugger
        let args = {
            url: apiUrl['registerUser'],
            method: 'post',
            dataString: data,
            successCallback: function (args) {
                appService.preLoaderHide();
                let responseData = args['data'];
                let dialogArgs = {
                    type: 'alert',
                    text: "",
                }
                if (responseData && responseData.status == 200) {
                    dialogArgs.title = responseData['message'];
                    dialogArgs.callbackOk = function () {
                        loginService.redirect('/login/', {
                            reloadAll: true
                        })
                    }
                    dialog.customDialog(dialogArgs);
                } else {
                    debugger
                    dialogArgs.title = responseData['message']
                    dialog.customDialog(dialogArgs);
                }
            }
        }
        loginService.callAPI(args)
    }
}