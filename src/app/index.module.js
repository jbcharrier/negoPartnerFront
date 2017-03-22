/* global moment:false, firebase:false */

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

angular.module('negoPartnerFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'md.data.table'])
  .constant('moment', moment)
  .constant('firebase', firebase)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('LoginController', LoginController)
  .service('Account', AccountFactory)
  .service('Audit', AuditFactory)
  .service('User', UserFactory)
  .controller('MainController', MainController)
  .controller('LoginController', LoginController)
  .controller('AuditController', AuditController)
  .controller('AreasController', AreasController)
  .controller('AuditProcessController', AuditProcessController)
  .directive('navbar', NavbarDirective);
