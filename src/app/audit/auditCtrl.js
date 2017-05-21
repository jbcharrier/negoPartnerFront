export class AuditController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
    
    $scope.accountId = $stateParams.accountId;
    console.log("$scope.accountId", $scope.accountId);
  
    if ($scope.accountId) {
      Account.getAccount($scope.accountId).then(function (account) {
        $scope.sites = account.sites;
      })
    }
  }
}
