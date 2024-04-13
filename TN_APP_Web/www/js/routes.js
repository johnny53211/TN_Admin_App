var routes = [{
    name: "home",
    path: '/',
    url: './index.html',
},
{
    path: '/login/',
    url: './pages/login.html',
},
{
    name: "events",
    path: '/events/',
    url: './pages/events.html',
    on: {
        pageBeforeIn: function (e, page) {
            let pageElement = page.$el;
            let queryData = e.detail.route.query || {};
            if (queryData && Object.keys(queryData).length > 0) {
                $(pageElement).find('.back').hide();
            }
        }
    }
},
{
    path: '/attendance/',
    url: './pages/attendance.html',
},
// Default route (404 page). MUST BE THE LAST
{
    path: '(.*)',
    url: './pages/404.html',
},
];