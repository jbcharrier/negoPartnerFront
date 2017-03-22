export class AuditProcessController {
  constructor ($scope, $stateParams, $mdDialog, $state, Account, Audit) {
    'ngInject';
    
    var accountId = '-Kbf1d-w6wJ_KVrW_mQs';
    $scope.siteId = $stateParams.siteId;
    $scope.areaId = $stateParams.areaId;
    $scope.status = '  ';
    $scope.customFullscreen = false;

    if (accountId && $scope.siteId && $scope.areaId) {
      Account.getOperationsList(accountId, $scope.siteId, $scope.areaId).then(function (operations) {
        $scope.operations = operations;
      });
    }
    
    $scope.saveAudit = function (operations) {
      angular.forEach(operations, function(operation) {
        var date = new Date();
        operation.auditDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      });
      Audit.saveAudit(accountId, $scope.siteId, $scope.areaId, operations);
    };
  
    $scope.showConfirm = function(ev) {
      var confirm = $mdDialog.confirm()
        .title('Confirmation')
        .textContent('Sauvegarder vos réponses pour l\'audit de cet espace ?')
        .ariaLabel('Modale de confirmation')
        .targetEvent(ev)
        .ok('Sauvegarder')
        .cancel('Annuler');
    
      $mdDialog.show(confirm).then(function() {
        $scope.saveAudit($scope.operations);
        $state.go('areas', {siteId: $scope.siteId});
      }, function() {
        $scope.status = 'There\'s been a problem...';
      });
    };
  }
}
