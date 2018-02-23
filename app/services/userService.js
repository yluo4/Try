/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('gamma', [])

        .service('UserService', ['$window', 'CookieService', 'noRole', function ($window, CookieService, noRole) {
                var userAdmin = false;
                this.determineUserAccess = function (useraccessobject, role) {
                    var userRole = noRole;
                    for (i = 0; i < useraccessobject.length; i++) {
                        if (useraccessobject[i].role === role) {
                            //userAdmin = true;
                            userRole = role;
                            break;
                        }
                    }
                    return userRole;
                };
                this.determineRole = function (useraccessobject, userModule, sidebarMenuItem) {
                    // For Trinity, the User Access Cookie has module = 'Hosted Communications'
                    // where as the Side Bar Menu JSON object has module = 'HOSTED_COMM'
                    // and has menuItem = 'Hosted Communications'
                    // For vUSP, the User Access Cookie has module = 'vUSP'
                    // and the Side Bar Menu JSON object has module = 'vUSP'
                    // and has menuItem = 'vUSP'
                    var role = noRole;
                    for (i = 0; i < useraccessobject.length; i++) {
                        if (useraccessobject[i].module.toLowerCase() === sidebarMenuItem.toLowerCase()) {
                            role = useraccessobject[i].role;
                            break;
                        }
                    }
                    return role;
                };
                this.isUserAdmin = function () {
                    var userRole = this.determineUserAccess(JSON.parse(JSON.parse(CookieService.readCookie('user_access', true))), 'ADMIN');
                    return userRole === 'ADMIN';
                };
                this.getModuleRole = function (userModule, sidebarMenuItem) {
                    var userRole = this.determineRole(JSON.parse(JSON.parse(CookieService.readCookie('user_access', true))), userModule, sidebarMenuItem);
                    return userRole;
                };
                this.getUserRole = function (userModule) {
                    if (userModule === "hc") {
                        userModule = "Hosted Communications";
                    }
                    var userRole = this.determineRole(JSON.parse(JSON.parse(CookieService.readCookie('user_access', true))), userModule, userModule);
                    return userRole;
                };
                this.hasRole = function () {
                    var hasRole = false;
                    var roleArray = JSON.parse(JSON.parse(CookieService.readCookie('user_access', true)));
                    if ((roleArray) && (roleArray.length > 0)) {
                        hasRole = true;
                    }
                    return hasRole;
                };
            }]);