export class Auth {
  constructor($q, $log, firebase) {
    'ngInject';
    
    this.$q = $q;
    this.$log = $log;
    this.access = false;
    this.firebase = firebase;
    this.connected = false;
    this.userEmail = '';
  }
  
  getUserEmail(){
    return this.userEmail;
  }
  
  getPermission() {
    this.access = true;
  }
  
  checkPermission() {
    return this.access;
  }
  
  isConnected() {
    return this.connected;
  }
  
  signOut(){
    this.Firebase.auth().signOut().then(function(data){
      this.userEmail = data.email;
      return data;
    }.bind(this)).catch(function (error) {
      this.$log.error('error.code', error.code);
      this.$log.error('error.message', error.message);
    }.bind(this));
  }
  
  signIn (id, pass) {
    return this.Firebase.auth().signInWithEmailAndPassword(id, pass).then(function(data){
      this.connected = true;
      this.userEmail = data.email;
      return data;
    }.bind(this))
  }
  
  // onAuthChange(){
  //   return this.Firebase.auth().onAuthStateChanged()
  // }
}
