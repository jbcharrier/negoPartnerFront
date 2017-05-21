export class LoginController {
  constructor ($scope, $state, $log, $mdToast, User, Auth) {
    'ngInject';
    
    $scope.user = User.getNewUser();
    
    $scope.loginUser = function (user) {
      User.signIn(user.email, user.password).then(function (data) {
        if(data.uid){
          Auth.getPermission();
          User.getLoggedUser(user.email).then(function (newUser) {
            if(newUser.accountId && newUser.siteSelected) {
              $state.go('areas', {accountId: newUser.accountId, siteId: newUser.siteSelected});
            } else if(newUser.accountId){
                $state.go('audit', {accountId: newUser.accountId});
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
