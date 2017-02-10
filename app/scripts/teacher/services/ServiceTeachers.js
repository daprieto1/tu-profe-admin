(function () {
    'use strict';

    angular.module('teacherModule')
        .factory('ServiceTeachers', function ($resource, $http, TU_PROFE_API) {

            var Teacher = $resource(TU_PROFE_API + '/teacher/:id', { id: '@id' }, {
                update: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/teacher',
                    method: 'PUT'
                },
                activateAccount: {
                    url: TU_PROFE_API + '/teacher/activate-account/:id',
                    params: { id: '@id' },
                    method: 'POST'
                },
                acceptGameRules: {
                    url: TU_PROFE_API + '/teacher/accept-game-rules/:id',
                    params: { id: '@id' },
                    method: 'POST'
                },
                takeExam: {
                    url: TU_PROFE_API + '/teacher/take-exam/:id',
                    params: { id: '@id' },
                    method: 'POST'
                }
            })

            return {
                getTeacher: function (id) {
                    return Teacher.get({ id: id }).$promise;
                },

                update: function (teacher) {
                    return Teacher.update({}, teacher).$promise;
                },

                activateAccount: function (teacherId) {
                    return Teacher.activateAccount({ id: teacherId }).$promise;
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
                }
            };
        });
})();