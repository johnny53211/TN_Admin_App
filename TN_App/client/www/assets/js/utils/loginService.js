/**
 * Author : Zeeshan M.
 * Date : 8 April 2019
 */
'use strict';
let activityObj;
let loginService = {
    ajaxTimeOut: 5000,
    self: this,
    isLoggedIn: false,
    adminRole: "4",
    formValid: true,
    emailValid: false,
    currentPassword: false,
    noauthPage: "login.html",
    defaultPage: "/",
    landingPage: "dashboard.html",
    adminPage: "admin/",
    login: function (data) {
        //app.showLoader();
        // please wait .. 
        $('.message').html('Please Wait...');
        let args = {
            url: apiUrl['loginUser'],
            method: "POST",
            dataString: data,
            successCallback: loginService.loginSuccess,
            errorCallback: loginService.loginFailure
        };
        // console.log(args.dataString);
        loginService.callAPI(args);
    },// login success
    loginSuccess: function (args) {
        let data = args.data;
        if (config.userStatuses[data.status]) {
            appService.preLoaderHide();
            dialogArgs = {
                type: 'alert',
                title: config.userStatuses[data.status],
                text: "TN Maxval"
            }
            dialog.customDialog(dialogArgs)
        }
        else {
            $('#loginBtn').text('LOGGING IN ... ');
            loginService.isLoggedIn = true;
            loginService.storeData('userData', JSON.stringify(data['data']));
            appService.preLoaderHide();
            loginService.redirect(loginService.defaultPage, {
                reloadAll: true
            });
        }
    },// ajax call 
    callAPI: (args) => {
        return $.ajax({
            async: args.isAsync,
            type: args.method,
            url: args.url,
            data: args.dataString,
            timeout: '' || loginService.ajaxTimeOut,
            success: function (data) {
                if (typeof args.successCallback != "undefined") {
                    args.data = data;
                    args.successCallback(args);
                }
            },
            error: function (error) {
                if (typeof args.errorCallback != "undefined") {
                    args.errorCallback(error);
                }
            }
        });
    },// login failure callback message
    loginFailure: function (data) {
        console.log(data);
        // alert(data);
    },// add data local storage 
    storeData: function (key, value) {
        localStorage.setItem(key, value);
    },// get data from local storage
    getData: function (key, value) {
        return localStorage.getItem(key);
    },// remove data from local storage 
    removeData: function (key) {
        return localStorage.removeItem(key);
    },// get userdata value
    getUserInfo: function (key) {
        let userData = $.parseJSON(loginService.getData('userData'));
        return key ? userData[key] : userData;
    },// check login if user data is exist redirect to home 
    checkLogin: function () {
        let userData = JSON.parse(loginService.getData('userData'));
        self.redirectPage = self.noauthPage;
        if (userData != null) {
            self.isLoggedIn = true;
            loginService.redirect('/', {
                reloadAll: true
            })
            return true;
        }
        return false;
    },// redirect route
    redirect: function (page, options = {}) {
        app.views.main.router.navigate(`${page}`, options);
    },// logout service
    logout: function () {
        let getToken = loginService.getUserInfo('token');
        activityObj = {
            token: getToken,
            activity: "logout"
        }
        loginService.removeData('userData');
        app.tab.show("#view-home");
        loginService.redirect('/login/', {
            reloadAll: true
        })
    },
    isRememberMe: () => {
        let isremember = $("#flexCheckDefault").is(":checked");
        if (isremember) {
        }
    },// check session user exist or not 
    checkSession: () => {
        let isLogin = loginService.checkLogin();
        if (!isLogin) {
            loginService.redirect('/login/', {
                reloadAll: true
            });

        }
    },// process of login form initiate
    processLogin: () => {
        let formData = app.form.convertToData('#loginForm');
        loginService.login(formData);
    }, // validate inputs
    validateForm: (formName) => {
        return app.input.validateInputs(formName);
    },
    routeBack: (url, options = {}) => {
        app.views.main.router.back(`${url}`, options);
    },
    routeRefresh: () => {
        app.views.main.router.refreshPage()
    },
    registerUser: () => {
        let validateForms = $("#registerForm").valid();
        if (validateForms) {
            appService.preLoaderShow();
            let formData = app.form.convertToData('#registerForm');
            appService.registerUser(formData);
        }
    }
}