export class AreasController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
    
    $scope.accountId = $stateParams.accountId;
    $scope.siteId = $stateParams.siteId;
    
    if ($scope.accountId && $scope.siteId) {
      Account.getAreasList($scope.accountId, $scope.siteId).then(function (areas) {
        $scope.areas = areas;
      })
    }
  }
}
