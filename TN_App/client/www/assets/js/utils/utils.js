let utils = {
    "leftPanel": {
        "list": [
            {
                "clickEvent": "loginService.logout",
                "iconOne": "person_alt",
                "iconTwo": "house",
                "title": "Logout",
                "class": "panel-close"
            }
        ]
    },
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
    },
    mapEmpDetails: (data) => {
        const mappedData = data.map(employee => {
            const { id, employee_name, father_name, mother_name, date_of_birth, designation, team_name, gender_type, mail_id, blood_group, date_of_joining, address, emp_code } = employee;
            return [
                {
                    "liClass": `li${id}`,
                    "title": "Emp Code",
                    "subTitle": emp_code,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Employee Name",
                    "class": "item-link item-content",
                    "subTitle": employee_name || '' // You haven't provided a value for employee name, so leaving it empty for now
                },
                {
                    "liClass": `li${id}`,
                    "title": "Father name",
                    "subTitle": father_name,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Mother Name",
                    "subTitle": mother_name,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Date of Birth",
                    "subTitle": date_of_birth,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Designation",
                    "subTitle": designation,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Team Name",
                    "subTitle": team_name,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Gender",
                    "subTitle": gender_type,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Mail Id",
                    "subTitle": mail_id,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Blood Group",
                    "subTitle": blood_group,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Date of Joining",
                    "subTitle": date_of_joining,
                    "class": "item-link item-content"
                },
                {
                    "liClass": `li${id}`,
                    "title": "Address",
                    "subTitle": address,
                    "class": "item-link item-content"
                },
            ];
        });
        return mappedData[0];
    }
}
