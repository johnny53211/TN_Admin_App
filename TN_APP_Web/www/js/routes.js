var routes = [
    {
        name: "home",
        path: '/',
        url: './index.html',
    },
    {
        name: "login",
        path: '/login/',
        url: './pages/login.html',
    },
    {
        name: "events",
        path: '/events/',
        url: './pages/events.html',
        on: {
            pageBeforeIn: async function (e, page) {
                let pageElement = page.$el;
                $(pageElement).find('.page-title').text('Events Management');
                let queryData = e.detail.route.query || {};
                if (Object.keys(queryData).length > 0) {
                    let args = {
                        url: 'http://192.168.80.52:5000/getEventList',
                        method: 'post',
                        dataString: queryData
                    };

                    let response = await utils.callAPI(args);
                    let celebrationresponse = response.data.fullMonthCelbration.find((element) => element.event_name == queryData['event_name']);

                    // Cache the input fields
                    let $eventDateInput = $(pageElement).find('input[name="event_date"]');
                    let $eventTimeInput = $(pageElement).find('input[name="event_time"]').attr('type', 'text')
                    let $eventNameInput = $(pageElement).find('input[name="event_name"]');
                    let $eventType = $(pageElement).find('.submitEvents')

                    // Set values directly
                    $eventDateInput.val(celebrationresponse.event_date);
                    $eventTimeInput.val(celebrationresponse.event_time);
                    $eventNameInput.val(celebrationresponse.event_name);
                    $eventType.attr('data-empcode', queryData.emp_code)
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
        on: {
            pageBeforeIn: function (e, page) {
                let pageElement = page.$el;
                $(pageElement).find('.page-title').text('Attendance Management');
            }
        }
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];