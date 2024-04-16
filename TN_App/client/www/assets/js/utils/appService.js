'use strict';
let baseUrl = `${config['serviceUrl']}:${config['PORT']}`;
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
    "getEmpDetails": `${baseUrl}/getEmpDetails`,
    "deleteEmpDetails": `${baseUrl}/deleteEmp`,
    "sendMail": `${baseUrl}/sendMail`,
    "addEmpDetails": `${baseUrl}/addEmpDetails`,
};
let appService = {
    foodType: null,
    genderType: null,
    teamList: null,
    eventList: null,
    preLoaderShow: (content = 'Please Wait ...') => {
        app.dialog.preloader(content);
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
    getFoodType: async (data) => {
        let args = {
            url: apiUrl['foodTypeList'],
            method: 'post',
            dataString: data
        }
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200)
                return res['data']
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
    getEvents: async (data = {}) => {
        let args = {
            url: apiUrl['eventList'],
            method: 'post',
            dataString: data
        }
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200) {
                return res['data'];
            }
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
    getEmpDetails: async (data) => {
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
    },
    deleteEmpDetails: async (data) => {
        let args = {
            url: apiUrl['deleteEmpDetails'],
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
            }
            appService.preLoaderHide();
        } catch (error) {
            console.log(error)
            appService.preLoaderHide();
        }
    },
    addEmpDetails: async (data) => {
        let args = {
            url: apiUrl['addEmpDetails'],
            method: 'post',
            dataString: data
        };
        try {
            let res = await loginService.callAPI(args);
            if (res['status'] == 200) {
                notification.customNotification({ text: res['message'], title: "TN Admin", type: "create" });
                loginService.redirect('/employeeList/', {
                    reloadCurrent: true
                })
            } else {
                notification.customNotification({ text: res['message'], title: "TN Admin", type: "create" });
            }
            utils.popupClose('.my-popup');
            appService.preLoaderHide();
        } catch (error) {
            console.log(error)
            appService.preLoaderHide();
        }
    }
}