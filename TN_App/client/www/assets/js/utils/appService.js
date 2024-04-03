'use strict';
let baseUrl = config['serviceUrl'];
let dataString;
let apiUrl = {
    "registerUser": `${baseUrl}/registerUser`,
    "loginUser": `${baseUrl}/login`,
    "registerEmployees": `${baseUrl}/registerEmployees`,
    "addAttendance": `${baseUrl}/addAttendance`,
    "getEmployeeAttendance": `${baseUrl}/getEmployeeAttendance`,
    "eventList": `${baseUrl}/getEmployeeAttendance`,
    "yesNoList": `${baseUrl}/getEmpResponse`,
    "genderList": `${baseUrl}/getEmpGenderDetails`,
    "teamList": `${baseUrl}/getEmpTeamDetails`,
    "foodTypeList": `${baseUrl}/getEmpFoodPreference`,
};
let appService = {
    foodType: null,
    genderType: null,
    teamList: null,
    preLoaderShow: () => {
        app.dialog.preloader('Please Wait ...');
    },// app loader hide
    preLoaderHide: () => {
        app.dialog.close();
    },
    registerUser: (data) => {
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
    },
    getTeamList: async () => {
        let args = {
            url: apiUrl['teamList'],
            method: 'get',
        }
        try {
            let res = await loginService.callAPI(args);
            appService.teamList = JSON.parse(res);
        } catch (error) {
            console.log(error);
        }
    },
    getFoodType: async () => {
        let args = {
            url: apiUrl['foodTypeList'],
            method: 'get',
        }
        try {
            let res = await loginService.callAPI(args);
            appService.foodType = JSON.parse(res);
        } catch (error) {
            console.log(error)
        }
    },
    getGender: async () => {
        let args = {
            url: apiUrl['genderList'],
            method: 'get',
        }
        try {
            let res = await loginService.callAPI(args);
            appService.genderType = JSON.parse(res);
        } catch (error) {
            console.log(error)
        }
    }
}