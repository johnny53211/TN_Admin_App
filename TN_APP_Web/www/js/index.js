
$(document).ready(function () {
    localStorage.removeItem('isShare');
    let isSharePage = utils.isSharePage();
    if (isSharePage && Object.keys(isSharePage).length) {
        utils.redirect({ path: '/events/', query: isSharePage });
    }
});
$$(document).on('page:init', '.page[data-name="events"]', function (e, page) {
    let pageElement = page.$el;
    $('input[type="radio"][name="availability"]').change(function () {
        // Check the value of the selected radio button
        var selectedValue = $(this).val();
        // Show or hide content based on the selected value
        if (selectedValue === 'yes') {
            $(pageElement).find('.d-none').addClass('d-flex')
        } else {
            $(pageElement).find('.d-none').removeClass('d-flex')
        }
    });
})