export class AuditGlobalController {
  constructor ($scope, $mdDialog, $state, Audit) {
    'ngInject';
    
    $scope.accountId = sessionStorage.getItem("accountId");
    $scope.siteId = sessionStorage.getItem("siteId");
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.alert = 0;
    $scope.total = 0;
    $scope.commentary = '';
    
    if ($scope.accountId && $scope.siteId) {
      Audit.getAreasToAudit($scope.accountId, $scope.siteId).then(function(results) {
        $scope.siteName = results.siteName;
        $scope.areas = results.areasToAudit;
      })
    }
    
    function resetAlertAndTotal () {
      $scope.alert = $scope.total = 0;
    }
    
    $scope.updateScore = function () {
      resetAlertAndTotal();
      angular.forEach($scope.areas, function (item) {
        angular.forEach(item.operations, function (operation) {
          $scope.alert += +operation.result;
          $scope.total = $scope.alert;
        })
      });
    };
    
    $scope.saveAudit = function (areas) {
      angular.forEach(areas, function(area) {
        let dateNow = new Date().getTime();
        area.dateLastAudit = dateNow;
        delete area.$$hashKey;
        Audit.saveAudit($scope.accountId, $scope.siteId, area.id, area);
      });
    };
  
    $scope.showConfirm = function(ev, total, alert, commentary) {
      $mdDialog.params = {
        total,
        alert,
        commentary,
      };
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/audit/areas/auditGlobal/confirmDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
        .then(function() {
          $scope.saveAudit($scope.areas);
          $state.go('areas', {accountId: $scope.accountId, siteId: $scope.siteId});
        }, function() {
          $scope.status = 'There\'s been a problem...';
        });
    };
  
    function DialogController($scope, $mdDialog) {
      
      $scope.infos = $mdDialog.params;
      
      $scope.hide = function() {
        $mdDialog.hide();
      };
    
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    
      $scope.validateAudit = function() {
        $mdDialog.hide();
      };
    }
  }
}
