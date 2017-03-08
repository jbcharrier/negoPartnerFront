export class AuditController {
  constructor ($scope, Account) {
    'ngInject';
    
    var accountId = '-Kbf1d-w6wJ_KVrW_mQs';
  
    if (accountId) {
      Account.getAccount(accountId).then(function (account) {
        console.log("account", account);
        $scope.sites = account.sites;
      })
    }
  }
}
