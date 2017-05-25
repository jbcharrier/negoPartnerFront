export class AuditController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
    
    if(sessionStorage.getItem("siteId")){
      sessionStorage.removeItem("siteId")
    }
  
    if(sessionStorage.getItem("accountId")) {
      $scope.accountId = sessionStorage.getItem("accountId");
    } else {
      $scope.accountId = $stateParams.accountId;
      sessionStorage.setItem('accountId', $scope.accountId);
    }
    
    if ($scope.accountId) {
      Account.getAccount($scope.accountId).then(function (account) {
        $scope.sites = account.sites;
      })
    }
  }
}
