var $$ = Dom7;
var app = new Framework7({
  name: 'Employee Portal', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  animateNavBackIcon: true,
  options: {
    history: false
  },
  preloadPreviousPage: false,

  // Cordova Statusbar settings
  routes: routes,
  modalButtonOk: 'Ok',
  modalButtonCancel: 'Cancel'
});

mainView = app.views.create('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar   
  preloadPreviousPage: false,
  animatePages: true,
});