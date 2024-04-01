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
    name: 'register',
    path: '/register/',
    url: './pages/register.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        // Render Template
        template.renderTemplate(`#linkAccount`, '#regiterFormList', homeTab["registerFormJson"], pageElement)
      },
    },
  },
  {
    name: "configure_vault",
    path: '/Configure-vault/',
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        vaultService.getVaultStatus();
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab["ConfigureVault"], pageElement, 2)
      },
    },
  },
  {
    name: "discover_vault",
    path: "/discover-vault/",
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab["discoverVault"], pageElement, 2)
      },
    },
  },
  {
    name: "configure_iot",
    path: "/configure-iot/",
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, '#listViewList', homeTab["ConfigureIot"], pageElement, 2)
      },
    },
  },
  {
    path: "/connected-device/",
    url: './pages/listView.html',
    on: {
      pageBeforeIn: function (e, page) {
        vaultService.getConnectedDevice();
        let pageElement = page.$el;
        template.renderTemplate(`#listView`, "#listViewList", homeTab['connectedDevice'], pageElement, 2)
      },
    },
  },
  {
    path: "/settings/",
    url: './pages/listView.html',
    on: {
      pageTabShow: function (tab) {
        let pageElement = tab.target.f7Page.$pageEl;
        $('.iconClass').remove();
        template.renderTemplate(`#listView`, '#listViewList', settingTab['settingsJson'], pageElement, 2);
      },
    },
  },
  {
    path: '/link-account/',
    url: './pages/linkAccount.html',
    on: {
      pageBeforeIn: function (e, page) {
        vaultService.getAuthorize();
        let pageElement = page.$el;
        template.renderTemplate(`#linkAccount`, '#linkAccountRender', homeTab['linkAccountJson'], pageElement, 2)
      },
    },
  },
  {
    path: '/service-monitor/',
    url: './pages/serviceMonitor.html',
  },
  {
    path: '/accordion-page/',
    url: './pages/accordion.html',
    on: {
      pageBeforeIn: function (e, page) {
        let pageElement = page.$el;
        template.renderTemplate(`#accordionTemplate`, "#accordionList", homeTab['accordionArr'], pageElement, 2)

      },
    }
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];