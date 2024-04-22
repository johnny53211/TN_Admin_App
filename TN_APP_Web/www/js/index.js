
$(document).ready(function () {
    localStorage.removeItem('isShare');
    let isSharePage = utils.isSharePage()
    if (isSharePage && Object.keys(isSharePage).length) {
        utils.redirect({ path: '/events/', query: isSharePage });
    }
});
$$(document).on('page:init', '.page[data-name="events"]', async function (e, page) {
    let pageElement = page.$el;
    let isShare = localStorage.getItem('isShare');
    if (isShare == 1) {
        let queryData = e.detail.route.query || {};
        delete queryData.event_name;
        let args = {
            url: 'http://192.168.1.59:5000/getEmpFoodPreference',
            method: 'post',
            dataString: queryData
        };
        let response = await utils.callAPI(args);
    }
    $('input[type="radio"][name="attend"]').change(function () {
        // Check the value of the selected radio button
        var selectedValue = $(this).val();
        // Show or hide content based on the selected value
        if (selectedValue == '1') {
            $(pageElement).find('.d-none').addClass('d-flex')
        } else {
            $(pageElement).find('.d-none').removeClass('d-flex')
        }
    });
})
async function foddPreferenceSubmit() {
    let nofication;
    let foodPreference = app.form.convertToData('#foodPreference');
    foodPreference['emp_code'] = $('.submitEvents').data('empcode');
    foodPreference['no_members'] = $('#food-count').text();
    let args = {
        url: 'http://192.168.1.59:5000/addEmpFoodPreference',
        method: "post",
        dataString: foodPreference
    }
    let response = await utils.callAPI(args);
    if (response['status'] == 200) {
        nofication = app.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'TN Admin',
            subtitle: `Food Preference ${response['message']}`,
            closeTimeout: 3000,
        });
        nofication.open();
        $('.submitEvents').addClass('disabled');
    } else {
        nofication = app.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'TN Admin',
            subtitle: `Food Preference ${response['message']}`,
            closeTimeout: 3000,
        });
        nofication.open();
        $('.submitEvents').addClass('disabled');
    }
}
