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
                signUpTeacher: function (teacher) {
                    return Session.signUpTeacher({}, teacher).$promise;
                },

                signUpStudent: function (student) {
                    return Session.signUpStudent({}, student).$promise;
                },

                signUpAdminUser: function (adminUser) {
                    return Session.signUpAdminUser(adminUser).$promise;
                },

                loginAdminUser: function (username, password) {
                    return Session.loginAdminUser({ username: username, password: password }).$promise;
                }
            };
        });
})();