export class AuditHistoricController {
  constructor ($scope, $stateParams, Audit) {
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
      Audit.getAuditsList($scope.accountId, $scope.siteId, $scope.areaId).then(function (audits) {
        $scope.areaName = Object.values(audits)[0].name;
        $scope.audits= audits;
        angular.forEach(audits, function (audit) {
          let alerts = 0;
          angular.forEach(audit.operations, function (operation) {
            if(operation.result == 1){
              alerts++;
            }
          });
          audit.score = alerts;
        })
      })
    }
  }
}
