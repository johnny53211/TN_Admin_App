'use strict';
let baseUrl = config['serviceUrl'];
let dataString;
let apiUrl = {
    "registerUser": `${baseUrl}/registerUser`,
    "loginUser": `${baseUrl}/login`,
    "registerEmployees": `${baseUrl}/registerEmployees`,
    "addAttendance": `${baseUrl}/addAttendance`,
    "getEmployeeAttendance": `${baseUrl}/getEmployeeAttendance`,
    "eventList": `${baseUrl}/getEventList`,
    "yesNoList": `${baseUrl}/getEmpResponse`,
    "genderList": `${baseUrl}/getEmpGenderDetails`,
    "teamList": `${baseUrl}/getEmpTeamDetails`,
    "foodTypeList": `${baseUrl}/getEmpFoodPreference`,
    "addEvents": `${baseUrl}/addEvents`,
    "getEmpDetails": `${baseUrl}/getEmpDetails`
};
let appService = {
    foodType: null,
    genderType: null,
    teamList: null,
    eventList: null,
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
            if (res['status'] == 200)
                appService.teamList = res['data'];
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
            if (res['status'] == 200)
                appService.foodType = res['data'];
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
            if (res['status'] == 200)
                appService.genderType = res['data'];
        } catch (error) {
            console.log(error)
        }
    },
    getEvents: async () => {
        let args = {
            url: apiUrl['eventList'],
            method: 'get',
        }
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200)
                appService.eventList = res['data'];
        } catch (error) {
            console.log(error)
        }
    },
    addEvents: async (data) => {
        let args = {
            url: apiUrl['addEvents'],
            method: 'post',
            dataString: data
        }
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200) {
                let dialogArgs = {
                    type: 'alert',
                    title: res['message'],
                    text: "TN Admin",
                }
                dialog.customDialog(dialogArgs)
                appService.eventList = res['data'];
            }
            appService.preLoaderHide();
        } catch (error) {
            console.log(error)
            appService.preLoaderHide();
        }
    },
    "getEmpDetails": async (data) => {
        let args = {
            url: apiUrl['getEmpDetails'],
            method: 'post',
            dataString: data
        }
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200) {
                return res['data']
            }
            appService.preLoaderHide();
        } catch (error) {
            console.log(error)
            appService.preLoaderHide();
        }
    }
}