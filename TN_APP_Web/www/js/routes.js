var routes = [{
    path: '/',
    url: './index.html',
},
{
    path: '/login/',
    url: './pages/login.html',
},
{
    path: '/events/',
    url: './pages/events.html',
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