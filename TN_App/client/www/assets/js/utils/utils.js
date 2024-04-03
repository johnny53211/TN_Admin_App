let utils = {
    showLoginName: function () {
        var userData = loginService.getData('userData');
        userData = JSON.parse(userData);
        $("#loginName").html(`Hello ${userData['username']}`);
    },
    convertDateAndTime: (dateTimeString) => {
        var dateTimeComponents = dateTimeString.split("T");
        var date = dateTimeComponents[0]; // Date component
        var timeComponents = dateTimeComponents[1].split(":");
        var hours = parseInt(timeComponents[0]);
        var minutes = timeComponents[1];

        // Convert hours to 12-hour format and determine AM or PM
        var meridian = (hours >= 12) ? "PM" : "AM";
        hours = (hours % 12 === 0) ? 12 : hours % 12;

        // Construct formatted time string
        var time = hours + ":" + minutes + " " + meridian;
        return { time, date }
    }
}
