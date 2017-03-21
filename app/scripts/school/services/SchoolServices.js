(function () {
    'use strict';

    angular.module('schoolModule')
        .factory('SchoolServices', function ($resource, TU_PROFE_API) {
            var School = $resource(TU_PROFE_API + '/school/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/school',
                    method: 'PUT'
                }
            })

            return {

                getAll: function () {
                    return School.query().$promise;
                },
                
                create: function (school) {
                    return School.save(school).$promise;
                }

            }
        });
})();