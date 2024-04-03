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
  {
    name: "employee",
    path: '/employee/',
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab["employeePage"], pageElement, 2)
      },
    },

  },
  {
    name: "employee",
    path: '/employeeList/',
    url: './pages/dataTable.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        // template.renderTemplate(`#listView`, '#listViewList', homeTab["employeePage"], pageElement, 2)
      },
    },

  },
  {
    name: "employee",
    path: '/employeeDetails/',
    url: './pages/dataTable.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        // template.renderTemplate(`#listView`, '#listViewList', homeTab["employeePage"], pageElement, 2)
      },
    },

  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];