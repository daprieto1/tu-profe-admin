(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('LinkUpController', function ($modal, InterviewServices, CourseServices, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            vm.validCultureForm = function () {
                var t = { id: vm.teacher.id, cultureForm: true };
                return ServiceTeachers.update(t)
                    .then(function () {
                        vm.cultureForm = false;
                        alertify.success('La descripción de perfil ha sido actualizada');
                    }, function (error) {
                        alertify.error('La descripción de perfil no ha sido actualizada:' + error.data.message);
                    });
            };

            vm.changeValidData = function (validData) {
                return ServiceTeachers.changeValidData(vm.teacher.id, validData)
                    .then(function () {
                        vm.teacher.validData = validData ? true : false;
                        alertify.success('La validez de los datos del profesor se actualizado con éxito.');
                    }, function (error) {
                        alertify.error('La validez de los datos del profesor no se ha actualizado:' + error.data.message);
                    });
            };

            vm.editProfileDescription = function () {
                var t = { id: vm.teacher.id, profileDescription: vm.teacher.profileDescription };
                return ServiceTeachers.update(t)
                    .then(function () {
                        vm.editProfileData = false;
                        alertify.success('La descripción de perfil ha sido actualizada');
                    }, function (error) {
                        alertify.error('La descripción de perfil no ha sido actualizada:' + error.data.message);
                    });
            };

            vm.canLinkUpTeacher = function () {
                return false;
            };

            vm.openSelectInterviewModal = function () {
                var params = {
                    templateUrl: 'views/teacher/modals/selectInterviewModal.html',
                    resolve: {
                        teacherId: function () {
                            return vm.teacher.id;
                        },
                    },
                    controller: function ($scope, $modalInstance, teacherId, InterviewServices) {
                        $scope.teacherId = teacherId;
                        InterviewServices.getAllActive()
                            .then(function (interviewsResponse) {
                                $scope.interviews = interviewsResponse;
                                $scope.interviews.forEach(function (interview) {
                                    interview.momentDate = moment(interview.startDateTime).format('LLL');
                                });
                            });

                        $scope.takePlace = function (interviewId) {
                            $scope.promiseTakePlace = InterviewServices.takePlace($scope.teacherId, interviewId)
                                .then(function () {
                                    alertify.success('La entrevista ha sido agendada con éxito.');
                                    $modalInstance.close();
                                }, function (error) {
                                    alertify.error('La entrevista no ha podido ser agendada: ' + error.data.message);
                                });
                        };

                    }
                };
                var modalInstance = $modal.open(params);
                modalInstance.result.then(function (selectedItem) {
                    vm.teacher.state = TEACHER_STATES.interview.id;
                }, function () {
                    alertify.error('La entrevista no fue agendada');
                });
            };

            function initCtrl() {
                vm.editProfileData = false;

                vm.ready = false;
                vm.teacher = {};
                vm.teacher.gradeDateMoment = moment(vm.teacher.gradeDate).format('MMMM Do YYYY');

                ServiceTeachers.getTeacher('7dfd7f6b-f6fc-4d27-9c37-e43ce063c300')
                    .then(function (teacherResponse) {
                        vm.teacher = teacherResponse;
                        CourseServices.getAll()
                            .then(function (response) {
                                vm.courses = response;
                                vm.teacher.courses = vm.courses.filter(function (course) {
                                    return vm.teacher.courses.indexOf(course.id) > -1;
                                });
                            });
                    });

            }

            initCtrl();
        });
})();