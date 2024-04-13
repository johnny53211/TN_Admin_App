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
        pageBeforeIn: async function (e, page) {
            app.preloader.show();
            let pageElement = page.$el;
            let queryData = e.detail.route.query || {};
            if (Object.keys(queryData).length > 0) {
                $(pageElement).find('.back').hide();

                let args = {
                    url: 'http://192.168.0.100:5000/getEventList',
                    method: 'post',
                    dataString: queryData
                };

                let response = await utils.callAPI(args);
                let celebrationresponse = response.data.fullMonthCelbration[0];

                // Cache the input fields
                let $eventDateInput = $(pageElement).find('input[name="event_date"]');
                let $eventTimeInput = $(pageElement).find('input[name="event_time"]');
                let $eventNameInput = $(pageElement).find('input[name="event_name"]');
                let $eventType = $(pageElement).find('.submitEvents')

                // Set values directly
                $eventDateInput.val(celebrationresponse.event_date);
                $eventTimeInput.val(celebrationresponse.event_time);
                $eventNameInput.val(celebrationresponse.event_name);
                $eventType.attr('data-type', celebrationresponse.event_type)
                app.preloader.hide();
            } else {
                app.preloader.hide();
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