// =================================================
/* 
   Author       : Johnson R 
   Created Date : 
   Edited Date  :
   Description  : App All Routes Declare
*/
// ==================================================
let routes = [
  {
    name: 'home',
    path: '/',
    url: './index.html',
  },
  {
    path: '/login/',
    url: './login.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        // Render Template
        template.renderTemplate(`#linkAccount`, '#loginFormList', homeTab["loginFormJson"], pageElement)

      },
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];