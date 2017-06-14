(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('LinkUpController', function ($modal, $q, localStorageService, ServiceSchedulers, SchoolServices, ProfessionServices, InterviewServices, CourseServices, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            vm.changeCultureForm = function () {
                vm.originalTeacher.cultureForm = true;
                return ServiceTeachers.update(vm.originalTeacher)
                    .then(function () {
                        vm.cultureForm = false;
                        alertify.success('El Formulario de cultura de tu profe ha sido validado');
                        getTeacher(vm.teacher.id);
                    }, function (error) {
                        alertify.error('El Formulario de cultura de tu profe no ha sido validado:' + error.data.message);
                    });
            };

            vm.changeValidData = function () {
                return ServiceTeachers.changeValidData(vm.teacher.id)
                    .then(function () {
                        alertify.success('La validez de los datos del profesor se actualizado con éxito.');
                        getTeacher(vm.teacher.id);
                    }, function (error) {
                        alertify.error('La validez de los datos del profesor no se ha actualizado:' + error.data.message);
                    });
            };

            vm.editProfileDescription = function () {
                vm.originalTeacher.profileDescription = vm.teacher.profileDescription;
                return ServiceTeachers.update(vm.originalTeacher)
                    .then(function () {
                        vm.editProfileData = false;
                        alertify.success('La descripción de perfil ha sido actualizada');
                        getTeacher(vm.teacher.id);
                    }, function (error) {
                        alertify.error('La descripción de perfil no ha sido actualizada:' + error.data.message);
                    });
            };

            vm.canLinkUpTeacher = function () {
                return vm.teacher.validData &&
                    vm.teacher.acceptGameRules &&
                    vm.teacher.exam.passExam &&
                    vm.teacher.cultureForm &&
                    vm.teacher.courses.length > 0;
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

            function getTeacher(teacherId) {
                $q.all([
                    SchoolServices.getAll(),
                    ProfessionServices.getAll(),
                    CourseServices.getAll(),
                    ServiceTeachers.getTeacher(vm.teacher.id),
                    ServiceSchedulers.getSchedule(vm.teacher.id)
                ])
                    .then(([schools, professions, courses, teacher, schedule]) => {
                        vm.originalTeacher = angular.copy(teacher);

                        teacher.courses = teacher.courses || [];
                        teacher.courses = courses.filter(function (course) {
                            return teacher.courses.indexOf(course.id) > -1;
                        });

                        vm.teacher = teacher;
                        vm.schedule = schedule;
                    });
            }

            function initCtrl() {
                vm.editProfileData = false;

                vm.ready = false;
                vm.teacher = localStorageService.get('selectedTeacher');
                vm.teacher.gradeDateMoment = moment(vm.teacher.gradeDate).format('MMMM Do YYYY');

                if (angular.isDefined(vm.teacher) && angular.isDefined(vm.teacher.id)) {
                    getTeacher(vm.teacher.id);
                } else {
                    $location.path('/link-up-teachers');
                }

            }

            initCtrl();
        });
})();