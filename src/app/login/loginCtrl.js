export class LoginController {
  constructor ($scope, $state, $log, $mdToast, User, Auth) {
    'ngInject';
    
    $scope.user = User.getNewUser();
    sessionStorage.clear();
    
    $scope.loginUser = function (user) {
      User.signIn(user.email, user.password).then(function (data) {
        if(data.uid){
          Auth.getPermission();
          User.getLoggedUser(user.email).then(function (user) {
            $scope.newUser = {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            };
            let myUser = JSON.stringify($scope.newUser);
            sessionStorage.setItem('user', myUser);
            if(user.accountId && user.siteSelected) {
              $state.go('areas', {accountId: user.accountId, siteId: user.siteSelected});
            } else if(user.accountId){
              $state.go('audit', {accountId: user.accountId});
            } else {
              $mdToast.show(
                $mdToast.simple()
                  .textContent("Vous n'avez pas les droits d'accès requis pour accéder à l'intégralité du service")
                  .position('bottom right')
                  .hideDelay(7000)
              );
            }
          });
        }
      }).catch(function (error) {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Vous n'avez pas les droits d'accès requis pour accéder au service")
            .position('bottom right')
            .hideDelay(7000)
        );
        console.log("error", error);
        $log.error(error.message);
      });
    }
  }
}
