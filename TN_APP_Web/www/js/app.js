var $$ = Dom7;
var app = new Framework7({
  name: 'Employee Portal', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  modalButtonOk: 'Ok',
  modalButtonCancel: 'Cancel',
  routes: routes,
});

let mainView = app.views.create('.view-main', {

  // Because we use fixed-through navbar we can enable dynamic navbar   
  preloadPreviousPage: false,
  animatePages: true,
  options: {
    history: false,
    browserHistory: false
  }
});