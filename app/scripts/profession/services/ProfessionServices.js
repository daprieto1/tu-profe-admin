(function () {
    'use strict';

    angular.module('professionModule')
        .factory('ProfessionServices', function ($resource, TU_PROFE_API) {
            var Profession = $resource(TU_PROFE_API + '/professions/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/professions',
                    method: 'PUT'
                }
            })

            return {

                getAll: function () {
                    return Profession.query().$promise;
                },
                
                create: function (profession) {
                    return Profession.save(profession).$promise;
                }

            }
        });
})();