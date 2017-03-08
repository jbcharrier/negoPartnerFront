export class AccountFactory {
  constructor($q, firebase){
    'ngInject';
    
    this.firebase = firebase;
    
    this.$q = $q;
    
    this.account = {
      name:'',
      address:'',
      addressComplement:'',
      city:'',
      postalCode:'',
      complement:'',
      creationDate:'',
      sites: {}
    };
  }
  
  
  get () {
    return this.account;
  }
  
  getAccount (id) {
    let defer = this.$q.defer();
    this.firebase.database().ref('account').child(id).once('value').then(function (data) {
      let account = data.val();
      defer.resolve(account);
    }, function (error) {
      defer.reject(error);
    });
    return defer.promise;
  }
  
  getSite(accountId, siteId){
    let defer = this.$q.defer();
    this.firebase.database().ref('account').child(accountId).child('sites').child(siteId).once('value').then(function (data) {
      let site = data.val();
      defer.resolve(site);
    }, function (error) {
      defer.reject(error);
    });
    return defer.promise;
  }
  
  getAreasList (accountId, siteId) {
    let defer = this.$q.defer();
    this.firebase.database().ref('account').child(accountId).child('sites').child(siteId).child('areas').once('value').then(function (data) {
      let areasList = data.val();
      defer.resolve(areasList);
    }, function (error) {
      defer.reject(error);
    });
    return defer.promise;
  }
}
