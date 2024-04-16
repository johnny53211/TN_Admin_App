const utils = {
    decryptData: (data = {}) => {
        let { secret, decrypt } = data;
        return GibberishAES.dec(decrypt, secret);
    },
    isSharePage: (pageElement) => {
        const currentPage = $(location);
        const currentPageURL = currentPage.attr("href");
        if (currentPageURL.indexOf("embed") == -1) false;
        localStorage.setItem('isShare', 1); // add is share if url was shared
        var eventsValue = utils.getParameterValue(currentPageURL, 'events'),
            decoreUrl = utils.decryptData({ decrypt: eventsValue, secret: 'events' }),
            emp_code = utils.getParameterValue(decoreUrl, 'emp_id'),
            event_date = utils.getParameterValue(decoreUrl, 'event_date'),
            event_name = utils.getParameterValue(decoreUrl, 'event_name');
        return { emp_code, event_date, event_name };

    },
    redirect: (options) => {
        app.views.main.router.navigate(options);
    },
    getParameterValue: function (data, key) {
        // Create a regular expression to match the key and its value
        var regex = new RegExp(key + "=([^&]+)");

        // Use the regular expression to extract the value
        var match = data.match(regex);

        // Check if a match is found
        if (match && match[1]) {
            // Return the decoded value
            return decodeURIComponent(match[1]);
        } else {
            // Return null if the key is not found
            return null;
        }
    }, callAPI: (args) => {
        return $.ajax({
            async: args.isAsync,
            type: args.method,
            url: args.url,
            data: args.dataString,
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