export class AreasController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
    
    var accountId = '-Kbf1d-w6wJ_KVrW_mQs';
    $scope.siteId = $stateParams.siteId;
    
    if (accountId && $scope.siteId) {
      Account.getAreasList(accountId, $scope.siteId).then(function (areas) {
        console.log("areas", areas);
        $scope.areas = areas;
      })
    }
  }
}
