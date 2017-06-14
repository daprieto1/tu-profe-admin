(function(){
    'use strict';
    angular.module('advisoryServiceModule')
        .factory('ServiceAdvisoryServices', function($resource, $http, envService){
            var TU_PROFE_API = envService.read('apiUrl');
            var AdvisoryService = $resource(TU_PROFE_API + '/advisory-services/:id', { id: '@id' }, {
                calculate: {
                    method: 'POST',
                    url: TU_PROFE_API + '/advisory-services/calculate'
                },

                getAllByStudentId: {
                    url: TU_PROFE_API + '/advisory-services/get-by-student/:studentId',
                    params: { studentId: '@studentId' },
                    method: 'GET',
                    isArray: true
                },
                
                filter:{
                    url: TU_PROFE_API + '/advisory-services/filter',
                    method: 'POST',
                    isArray: true
                }
            });

            return {
                
                filter: params => {
                    return AdvisoryService.filter(params).$promise;
                },
                
                getAdvisoryService: advisoryServiceId => {
                    return AdvisoryService.get({ id: advisoryServiceId }).$promise;
                },

                getAllByStudentId: studentId => {
                    return AdvisoryService.getAllByStudentId({ studentId: studentId }).$promise;
                },

                create: advisoryService => {
                    return AdvisoryService.save(advisoryService).$promise;
                },

                calculate: advisoryService => {
                    return AdvisoryService.calculate(advisoryService).$promise;
                },

                uploadFile: function (file, advisoryServiceId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('advisoryServiceId', advisoryServiceId)

                    return $http({
                        url: TU_PROFE_API + '/advisory-services/files/' + advisoryServiceId,
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                }

            }
        });
})();