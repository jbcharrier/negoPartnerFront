export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
      creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor ($rootScope, $scope, $state, moment) {
    'ngInject';
    
    // "this.creationDate" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();
    $scope.newUser = sessionStorage.getItem('user');
    this.user = JSON.parse($scope.newUser);
    
    $scope.disconnect = function(){
      sessionStorage.clear();
      $state.go('login');
    }
  }
}
