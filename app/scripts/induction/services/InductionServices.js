(function () {
    'use strict';

    angular.module('inductionModule')
        .factory('InductionServices', function ($resource, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Induction = $resource(TU_PROFE_API + '/induction/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/induction',
                    method: 'PUT'
                },
                getAllActive: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/induction/active',
                    isArray: true,
                    method: 'GET'
                },
                takePlace: {
                    params: { teacherId: '@teacherId', inductionId: '@inductionId' },
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/induction/take-place',
                    method: 'POST'
                }
            })

            return {

                getAll: function () {
                    return Induction.query().$promise;
                },
                getAllActive: function () {
                    return Induction.getAllActive().$promise;
                },
                create: function (induction) {
                    return Induction.save(induction).$promise;
                },
                takePlace: function (teacherId, inductionId) {
                    return Induction.takePlace({ teacherId: teacherId, inductionId: inductionId }).$promise;
                }

            }
        });
})();