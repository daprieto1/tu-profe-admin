(function () {

    'use strict';

    angular.module('userModule')
        .factory('UserServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var User = $resource(TU_PROFE_API + '/admin-user/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/admin-user',
                    method: 'PUT'
                }
            })
            return {
                getAll: function () {
                    return User.query().$promise;
                }
            };
        });
})();