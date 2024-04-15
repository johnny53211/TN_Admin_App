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
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        // Render Template

      },
      pageAfterIn: async function (e, page) {
        let pageElement = page.$el;
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
        $(pageElement).find('.page-title').text('Employee')
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
          columns: [
            { data: 'emp_code' },
            { data: 'emp_name' },
            {
              render: function (data, type, row) {
                return ` <a class="link" href="/filterEmployee/${row['emp_code']}"> <i class="icon f7-icons color-green">doc_chart</i>`;
              },
            }
          ]
        }
        if (!$.fn.DataTable.isDataTable(`#${args['selector']}`)) {
          dataTable.categoryTable(args)
        }
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
    name: "filterEmployee",
    path: '/filterEmployee/:emp_code',
    url: './pages/empProfile.html',
    on: {
      pageBeforeIn: async function (e, page) {
        let templateData = {}
        let pageElement = page.$el;
        let dataString = e.detail.route;
        let resData = await appService.getEmpDetails(dataString['params']);
        debugger
        templateData["list"] = utils.mapEmpDetails(resData['data']);
        pageElement.find('#removeEmp').attr('data-emp_code', dataString['params']['emp_code']);
        pageElement.find('#emp_name').html(resData['data'][0].emp_name)
        template.renderTemplate(`#listView`, '#employeeFilterList', templateData, pageElement, 2)
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
  {
    name: "upcomingFunctions",
    path: '/upcomingFunctions/:event_type',
    url: './pages/upcomingEvents.html',
    on: {
      pageBeforeIn: async function (e, page) {
        appService.preLoaderShow();
        let templateData = [];
        let dataString = e.detail.route;
        let pageElement = page.$el;
        $(pageElement).find('.subnavbar').remove();
        if (dataString['params']['event_type'] == 1) {
          let { fullMonthCelbration, getMonthBirthday } = await appService.getEvents(dataString['params']);
          templateData['list'] = utils.generateResponseEvents(fullMonthCelbration);
          templateData['isFullMonth'] = true;
          templateData['liClass'] = 'item-link item-content';
          let fulMonthHtml = template.renderTemplate(`#expandableTemplate`, '', templateData, pageElement, 2);
          templateData['list'] = [{ list: getMonthBirthday }];
          templateData['isBirthDay'] = true;
          templateData['isFullMonth'] = false;
          let fulMonthBirthday = template.renderTemplate(`#expandableTemplate`, '', templateData, pageElement, 2);
          pageElement.find('#renderCardCelebration').append(fulMonthHtml).append(fulMonthBirthday);
          appService.preLoaderHide();
        }
      },
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];