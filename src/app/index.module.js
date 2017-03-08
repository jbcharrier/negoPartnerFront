/* global malarkey:false, moment:false, firebase:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { LoginController } from './login/loginCtrl'
import { AuditController } from './audit/auditCtrl'
import { AccountFactory } from './services/account/account.service'
import { AreasController } from './audit/areas/areasCtrl'
import { AuditProcessController } from './audit/areas/auditProcess/auditProcessCtrl'

angular.module('negoPartnerFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'md.data.table'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('firebase', firebase)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('LoginController', LoginController)
  .service('Account', AccountFactory)
  .controller('MainController', MainController)
  .controller('AuditController', AuditController)
  .controller('AreasController', AreasController)
  .controller('AuditProcessController', AuditProcessController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
