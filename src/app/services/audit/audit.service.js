export class AuditFactory {
  constructor($q, firebase) {
    'ngInject';
    
    this.firebase = firebase;
    this.$q = $q;
    this.audit = {};
  }
  
  saveAudit (accountId, siteId, areaId, audit) {
    this.firebase.database().ref('audit').child(accountId).child('sites').child(siteId).child('areas').child(areaId).push(audit).then(function (data) {
      data.update({id:data.key});
    })
  }
}
