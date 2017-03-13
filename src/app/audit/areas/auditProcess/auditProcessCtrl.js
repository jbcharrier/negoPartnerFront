export class AuditProcessController {
  constructor ($scope, $stateParams, Account, Audit) {
    'ngInject';
    
    var accountId = '-Kbf1d-w6wJ_KVrW_mQs';
    $scope.siteId = $stateParams.siteId;
    $scope.areaId = $stateParams.areaId;
    

    if (accountId && $scope.siteId && $scope.areaId) {
      Account.getOperationsList(accountId, $scope.siteId, $scope.areaId).then(function (operations) {
        $scope.operations = operations;
      })
    }
    
    $scope.saveAudit = function (operations) {
      angular.forEach(operations, function(operation) {
        operation.auditDate = new Date();
        console.log("operation", operation);
      });
      //TODO Audit.saveAudit()
    }
  }
}
