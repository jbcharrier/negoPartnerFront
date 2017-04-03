export class AuditController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
    
    $scope.accountId = $stateParams.accountId;
  
    if ($scope.accountId) {
      Account.getAccount($scope.accountId).then(function (account) {
        $scope.sites = account.sites;
      })
    }
  }
}
