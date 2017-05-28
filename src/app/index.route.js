export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    })
    // .state('home', {
    //   url: '/home',
    //   templateUrl: 'app/main/main.html',
    //   controller: 'MainController',
    //   controllerAs: 'main'
    // })
    .state('audit', {
      url: '/audit',
      templateUrl: 'app/audit/audit.html',
      controller: 'AuditController',
      params:{
        accountId: null,
      },
      resolve: {
        "check": function(Auth, $state){
          if(sessionStorage.getItem('access')){
            console.log("Auth Permission OK session")
          } else if (Auth.checkPermission()){
            console.log("Auth Permission OK Auth")
          } else {
            $state.path('login');
          }
        }
      }
    })
    .state('areas', {
      url: '/areas',
      templateUrl: 'app/audit/areas/areas.html',
      controller: 'AreasController',
      params:{
        accountId: null,
        siteId: null
      },
      resolve: {
        "check": function(Auth, $state){
          if(sessionStorage.getItem('access')){
            console.log("Auth Permission OK session")
          } else if (Auth.checkPermission()){
            console.log("Auth Permission OK Auth")
          } else {
            $state.path('login');
          }
        }
      }
    })
    .state('audit-process', {
      url: '/audit-process',
      templateUrl: 'app/audit/areas/auditProcess/auditProcess.html',
      controller: 'AuditProcessController',
      params:{
        accountId: null,
        siteId: null,
        areaId: null
      },
      resolve: {
        "check": function(Auth, $state){
          if(sessionStorage.getItem('access')){
            console.log("Auth Permission OK session")
          } else if (Auth.checkPermission()){
            console.log("Auth Permission OK Auth")
          } else {
            $state.path('login');
          }
        }
      }
    })
    .state('audit-global', {
      url: '/audit-global',
      templateUrl: 'app/audit/areas/auditGlobal/auditGlobal.html',
      controller: 'AuditGlobalController',
      resolve: {
        "check": function(Auth, $state){
          if(sessionStorage.getItem('access')){
            console.log("Auth Permission OK session")
          } else if (Auth.checkPermission()){
            console.log("Auth Permission OK Auth")
          } else {
            $state.path('login');
          }
        }
      }
    });
  $urlRouterProvider.otherwise('/');
}
