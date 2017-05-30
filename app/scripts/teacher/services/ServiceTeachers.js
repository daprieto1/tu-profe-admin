(function () {
    'use strict';

    angular.module('teacherModule')
        .factory('ServiceTeachers', function ($resource, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Teacher = $resource(TU_PROFE_API + '/teachers/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/teachers',
                    method: 'PUT'
                },
                changeValidData: {
                    url: TU_PROFE_API + '/teachers/change-valid-data/:id',
                    params: { id: '@id' },
                    method: 'POST'
                },
                getLinkUpTeachers: {
                    url: TU_PROFE_API + '/teachers/link-up/all',
                    method: 'GET',
                    isArray: true
                }
            })

            return {
                getAll: function () {
                    return Teacher.query().$promise;
                },

                getTeacher: function (id) {
                    return Teacher.get({ id: id }).$promise;
                },

                update: function (teacher) {
                    return Teacher.update({}, teacher).$promise;
                },

                activateAccount: function (teacherId) {
                    return Teacher.activateAccount({ id: teacherId }).$promise;
                },

                changeValidData: function (teacherId) {
                    return Teacher.changeValidData({ id: teacherId }).$promise;
                },

                acceptGameRules: function (teacherId) {
                    return Teacher.acceptGameRules({ id: teacherId }).$promise;
                },

                takeExam: function (teacherId, exam) {
                    return Teacher.takeExam({ id: teacherId }, exam).$promise;
                },

                uploadCurriculum: function (file, teacherId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('teacherId', teacherId)

                    return $http({
                        url: TU_PROFE_API + '/teacher/upload-curriculum',
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                },

                uploadPhoto: function (file, teacherId) {
                    var fd = new FormData();
                    fd.append('file', file);
                    fd.append('teacherId', teacherId)

                    return $http({
                        url: TU_PROFE_API + '/teacher/upload-photo',
                        method: 'POST',
                        data: fd,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    });
                },

                getLinkUpTeachers: () => {
                    return Teacher.getLinkUpTeachers().$promise;
                }
            };
        });
})();