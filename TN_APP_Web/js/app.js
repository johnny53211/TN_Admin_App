var $$ = Dom7;
var app = new Framework7({
  name: 'Employee Portal', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  // App routes
  routes: routes,
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
});