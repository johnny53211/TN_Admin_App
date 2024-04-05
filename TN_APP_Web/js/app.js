var $$ = Dom7;
var app = new Framework7({
  name: 'Employee Portal', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  // Cordova Statusbar settings
  routes: routes,
  swipeBackPage: false,
  cache: false,
  tapHold: true,
  modalButtonOk: 'Ok',
  modalButtonCancel: 'Cancel'
});

mainView = app.views.create('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar   
  dynamicNavbar: true,
  domCache: false,
  preloadPreviousPage: false,
  swipeBackPage: false,
  animatePages: true,
});