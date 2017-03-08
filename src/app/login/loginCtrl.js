export class LoginController {
  constructor ($scope, $state, $log, User) {
    'ngInject';
    
    $scope.user = User.getNewUser();
    
    $scope.loginUser = function (user) {
      User.signIn(user.email, user.password).then(function (data) {
        if(data.uid){
          $state.go('home');
        }
        
      }, function (error) {
        $log.error(error);
      });
    }
  }
}
