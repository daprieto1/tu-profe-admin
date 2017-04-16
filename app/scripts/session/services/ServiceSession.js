(function () {

    'use strict';

    angular.module('sessionModule')
        .factory('ServiceSession', function ($http, $resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Session = $resource(TU_PROFE_API + '/session', {}, {
                loginAdminUser: {
                    method: 'POST',
                    params: { username: '@username', password: '@password' },
                    url: TU_PROFE_API + '/session/admin-user/login'
                },
                signUpAdminUser: {
                    method: 'POST',
                    url: TU_PROFE_API + '/session/admin-user/signup'
                }
            });

            return {
                loginAdminUser: function (username, password) {
                    return Session.loginAdminUser({ username: username, password: password }).$promise;
                },
                signUpAdminUser: function (adminUser) {
                    return Session.signUpAdminUser(adminUser).$promise;
                }
            };
        });
})();