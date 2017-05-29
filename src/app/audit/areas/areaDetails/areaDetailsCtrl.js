export class AreaDetailsController {
  constructor ($scope, $stateParams, Account) {
    'ngInject';
  
    $scope.accountId = sessionStorage.getItem("accountId");
    $scope.siteId = sessionStorage.getItem("siteId");
    
    let areaId = sessionStorage.getItem('areaId');
    
    if(areaId){
      $scope.areaId = areaId;
    } else {
      $scope.areaId = $stateParams.areaId;
      sessionStorage.setItem('areaId', $scope.areaId);
    }
    
    if ($scope.accountId && $scope.siteId && $scope.areaId) {
      Account.getOperationsList($scope.accountId, $scope.siteId, $scope.areaId).then(function (operations) {
        $scope.operations = operations;
      })
    }
  }
}
