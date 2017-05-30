export class AreasController {
  constructor ($scope, $stateParams, $state, Account) {
    'ngInject';
  
    if(sessionStorage.getItem("areaId")){
      sessionStorage.removeItem("areaId")
    }
  
    if(sessionStorage.getItem("accountId") && sessionStorage.getItem("siteId")) {
      $scope.accountId = sessionStorage.getItem("accountId");
      $scope.siteId = sessionStorage.getItem("siteId");
    } else {
      $scope.accountId = $stateParams.accountId;
      sessionStorage.setItem('accountId', $scope.accountId);
      $scope.siteId = $stateParams.siteId;
      sessionStorage.setItem('siteId', $scope.siteId);
    }
    
    
    if ($scope.accountId && $scope.siteId) {
      Account.getAreasList($scope.accountId, $scope.siteId).then(function (areas) {
        $scope.areas = areas;
      })
    }
    
    $scope.showAudits = function (areaId) {
      console.log("areaId", areaId);
      $state.go('audit-historic', {areaId: areaId});
    }
  }
}
