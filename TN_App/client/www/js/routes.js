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
    on: {
      pageAfterIn: async function (e, page) {
        // homeTab.homeRenderBtn();
        await Promise.all([appService.getGender(), appService.getFoodType(), appService.getTeamList(), appService.getEvents()]);
      }
    }
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
      },
      pageAfterIn: function (e, page) {
        let pageElement = page.$el;
        let args = {
          selector: 'dataTable_admin',
          columns: [{
            data: 'id'
          }]
        }
        dataTable.categoryTable(args)
      }
    },

  },
  {
    name: "eventsList",
    path: '/events/',
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab['eventsList'], pageElement, 2)
      },
    }
  },
  {
    name: "celebrationList",
    path: '/celebrationList/',
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab['celebrationList'], pageElement, 2)
      },
    }
  },
  {
    name: "tournamentsList",
    path: '/tournamentsList/',
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab['tournamentsList'], pageElement, 2)
      },
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];