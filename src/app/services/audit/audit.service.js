export class AuditFactory {
  constructor($q, firebase, Account) {
    'ngInject';
    
    this.firebase = firebase;
    this.$q = $q;
    this.audit = {};
    
    this.getSiteToAudit = function (accountId, siteId) {
      let defer = this.$q.defer();
      Account.getSite(accountId, siteId).then(function (site) {
        defer.resolve(site);
      }, function (error) {
        defer.reject(error);
      });
      return defer.promise;
    }
  }
  
  saveAudit(accountId, siteId, areaId, audit) {
    this.firebase.database().ref('audit').child(accountId).child('sites').child(siteId).child('areas').child(areaId).push(audit).then(function (data) {
      data.update({id: data.key});
    });
    
    let dateNow = audit.dateLastAudit;
    let dateNewAudit;
    switch (audit.auditFrequency) {
      case "Ponctuel":
        dateNewAudit = dateNow + 1000 * 60 * 60 * 24 * 30.4 * 12 * 40;
        break;
      case "Mensuel":
        dateNewAudit = dateNow + 1000 * 60 * 60 * 24 * 30.4;
        break;
      case "Trimestriel":
        dateNewAudit = dateNow + 1000 * 60 * 60 * 24 * 30.4 * 3;
        break;
      case "Annuel":
        dateNewAudit = dateNow + 1000 * 60 * 60 * 24 * 30.4 * 12;
        break;
    }
    this.firebase.database().ref('account').child(accountId).child('sites').child(siteId).child('areas').child(areaId).child('auditStartDate').set(dateNewAudit);
  }
  
  getAreasToAudit(accountId, siteId) {
    let defer = this.$q.defer();
    this.getSiteToAudit(accountId, siteId).then(function (site) {
      let dateNow = new Date().getTime();
      let results = {};
      let areasToAudit = [];
      results.siteName = site.name;
      angular.forEach(site.areas, function (area) {
        if (area.auditStartDate < dateNow) {
          areasToAudit.push(area);
        }
      });
      results.areasToAudit = areasToAudit;
      defer.resolve(results);
    }, function (error) {
      defer.reject(error);
    });
    return defer.promise;
  }
  
  getAuditsList(accountId, siteId, areaId) {
    let defer = this.$q.defer();
    this.firebase.database().ref('audit').child(accountId).child('sites').child(siteId).child('areas').child(areaId).once('value').then(function (data) {
      let auditsList = data.val();
      defer.resolve(auditsList);
    }, function (error) {
      defer.reject(error);
    });
    return defer.promise;
  }
}
