/* 
 * ErrorService displays an appropriate Error Message or an appropriate Error Page
 * future enhancement; ErrorService will log errors
 * usage; inject ErrorService, 
 * code a .error promise function with response data & status, 
 * call displayError to display error message on current page
 * call displayErrorPage to redirect to an error page
 */

angular.module('gamma', [])
        .service('ErrorService', ['$http', '$location', function ($http, $location) {
                var sErrorObject;
                var sErrorStatus;
                this.setError = function (errorObject) {
                    sErrorObject = errorObject;
                };
                this.getError = function () {
                    return sErrorObject;
                };
                this.setStatus = function (status) {
                    sErrorStatus = status;
                };
                this.getStatus = function () {
                    return sErrorStatus;
                };
                // to redirect to an error page
                this.displayErrorPage = function (errorObject, status) {
                    var url;
                    this.setError(errorObject);
                    this.setStatus(status);
                    if (this.getError().exception.type === 'IllegalAccessException') {
                        url = '/no-access';
                    }
                    else if (this.getError().exception.type === 'IllegalArgumentException') {
                        url = '/bad-request';
                    }
                    else if (this.getError().exception.type === 'InvalidBindingException') {
                        url = '/bad-request';
                    }
                    else if (this.getError().exception.type === 'UncategorizedSQLException') {
                        url = '/bad-request';
                    }
                    else {
                        url = '/server-error';
                    }
                    var pathUrl = $location.path(url);
                    return $http.get(pathUrl);
                };
                // to display error message on current page
                this.displayError = function (errorObject, status) {
                    var errorStatusMsg = 'An internal error occurred. Sorry for the inconvenience, please retry again later.';
                    this.setError(errorObject);
                    this.setStatus(status);
                    if (errorObject === null) {
                        errorStatusMsg = 'An internal error occurred. Sorry for the inconvenience, please retry again later.';
                    } else if (this.getStatus() >= 400 && this.getStatus() < 600) {
                        errorStatusMsg = 'An internal error occurred. Sorry for the inconvenience, please retry again later.';
                    }
                    return errorStatusMsg;
                };
            }]);