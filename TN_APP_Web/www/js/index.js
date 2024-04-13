
$(document).ready(function () {
    localStorage.removeItem('isShare');
    let isSharePage = utils.isSharePage();
    if (isSharePage && Object.keys(isSharePage).length) {
        utils.redirect({ path: '/events/', query: isSharePage });
    }
});