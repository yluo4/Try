/*
 * UserService
 * call UserService.isUserAdmin() method to determine if user is an ADMIN
 * isUserAdmin() returns boolean true/false
 * call UserService.getModuleRole(userModule, sidebarMenuItem)  method to determine User's role for the module
 * getModuleRole(userModule, sidebarMenuItem) returns role (ADMIN, VIEW, MODIFY, none)
 * Navigation Menu utilizes isUserAdmin() to determine displaying User Administration menu item
 * Side Bar Menu utilizes getModuleRole(userModule, sidebarMenuItem) to determine the role for the module
 */

    angular.module('gamma', [])
            .service('CookieService', function () {
                this.cookie = {
                    uuid: "uuid",
                    user: "user"
                };
                this.createCookie = function (name, value, days) {
                    var expires = "";
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toGMTString();
                    }
                    document.cookie = name + "=" + value + expires + "; path=/";
                };
                this.readCookie = function (name, decode) {
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var equalPos = ca[i].indexOf('=');
                        if (name === ca[i].substring(0, equalPos).trim()) {
                            var v = ca[i].substring(equalPos + 1);
                            if (decode) {
                                v = decodeURIComponent(v.replace(/\+/g, '%20'));
                            }
                            return v;
                        }
                    }
                    return null;
                };
                this.deleteCookie = function (name) {
                    createCookie(name, "", -1);
                };
            }); 
