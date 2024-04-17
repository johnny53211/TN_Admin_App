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
            const { id, emp_name, father_name, mother_name, date_of_birth, designation, team_name, gender_type, mail_id, blood_group, date_of_joining, address, emp_code } = employee;
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
                    "subTitle": emp_name || '' // You haven't provided a value for employee name, so leaving it empty for now
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
    },
    generateResponseEvents: function (data) {
        const mappedData = data.map(event => {
            const { id, event_name, add_date, event_date, event_type, celeb_type, update_date, ...rest } = event; // Exclude unwanted keys
            const updatedRest = { ...rest, event_date };
            const list = Object.entries(updatedRest).map(([key, value]) => ({
                liClass: `li${id}`,
                title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), // Capitalize the first letter and replace underscores with spaces
                subTitle: value,
                class: "item-link item-content"
            }));
            return { title: event_name, event_date: event_date, list };
        });
        return mappedData;
    },
    generateCelebHtml: (data = {}) => {
        let { listSelector, pageElement, renderSelector, arrayData } = data;
        arrayData = arrayData.map(element => {
            // Create a new object with the `content` key
            const mappedData = { title: element.title, content: '' };
            // Extract the list property and assign it to the `list` key in mappedData
            mappedData.list = element.list;
            // Assuming `template.renderTemplate` is a function that renders a template
            // with the provided parameters, use it to generate the content.
            mappedData.content = template.renderTemplate(`#${listSelector}`, '', mappedData, pageElement, 2);
            // Return the mappedData object containing both list and content
            return mappedData;
        });
        let templateData = { list: arrayData };
        return templateData;
    },
    encryptData: async (data = {}) => {
        let { secret, shareUrl } = data;
        return await GibberishAES.enc(shareUrl, secret);
    },
    popupOpen: (selector, animate = true) => {
        app.popup.open(selector, animate)
    },
    popupClose: (selector) => {
        app.popup.close(selector)
    },
    popupGet: (selector) => {
        return app.popup.get(selector);
    },
    getFormData: (selector) => {
        return app.form.convertToData(selector)
    },
    serachBarList: () => {
        $(document).on('keyup keydown change', 'input[name="searchBar"]', function (e) {
            var value = $(this).val().toLowerCase();
            $("#searchBar ul li").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) >= 0 || value.trim());
            });
        });
    }
}
