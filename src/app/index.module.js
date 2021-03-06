/* global moment:false, firebase:false, emailjs:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { LoginController } from './login/loginCtrl';
import { AuditController } from './audit/auditCtrl';
import { AccountFactory } from './services/account/account.service';
import { AreasController } from './audit/areas/areasCtrl';
import { AuditProcessController } from './audit/areas/auditProcess/auditProcessCtrl';
import { AuditFactory } from './services/audit/audit.service';
import { UserFactory } from './services/user/user.service';
import { Auth } from './services/auth/auth.service';
import { AuditGlobalController } from './audit/areas/auditGlobal/auditGlobalCtrl';
import { AreaDetailsController } from './audit/areas/areaDetails/areaDetailsCtrl';
import { AuditHistoricController } from './audit/areas/auditHistoric/auditHistoricCtrl';


angular.module('negoPartnerFront', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'md.data.table'])
  .constant('moment', moment)
  .constant('firebase', firebase)
  .constant('emailjs', emailjs)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('LoginController', LoginController)
  .service('Account', AccountFactory)
  .service('Audit', AuditFactory)
  .service('User', UserFactory)
  .service('Auth', Auth)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('AuditController', AuditController)
  .controller('AreasController', AreasController)
  .controller('AuditProcessController', AuditProcessController)
  .controller('AuditGlobalController', AuditGlobalController)
  .controller('AreaDetailsController', AreaDetailsController)
  .controller('AuditHistoricController', AuditHistoricController)
  .directive('navbar', NavbarDirective);
