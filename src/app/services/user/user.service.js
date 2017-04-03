export class UserFactory {
  constructor($q, firebase){
    'ngInject';
    
    this.firebase = firebase;
    
    this.$q = $q;
    
    this.user = {
      email: '',
      password: ''
    };
  }
  
  
  getNewUser () {
    return this.user;
  }
  
  getLoggedUser (email) {
    let defer = this.$q.defer();
    let id = (email).replace(/\./g, "DOT");
    
    this.firebase.database().ref('users').child(id).once('value').then(function (data) {
      let user = data.val();
      if(user){
        defer.resolve(user);
      } else {
        defer.reject('No user found with this email address. Please contact NegoPartner for the creation of your full access to the service');
      }
    });
    return defer.promise;
  }
  
  signIn (email, password){
    let defer = this.$q.defer();
    this.firebase.auth().signInWithEmailAndPassword(email, password).then(function (data) {
      if(data){
        defer.resolve(data);
      }
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      defer.reject(errorCode, errorMessage);
    });
    return defer.promise;
  }
}
