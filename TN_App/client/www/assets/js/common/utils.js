let utils = {
    showLoginName: function () {
        var userData = loginService.getData('userData');
        userData = JSON.parse(userData);
        $("#loginName").html(`Hello ${userData.name}`);
    }
}
