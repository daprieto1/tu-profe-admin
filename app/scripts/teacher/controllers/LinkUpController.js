(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('LinkUpController', function ($modal, InterviewServices, CourseServices, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            vm.editProfileDescription = function () {
                var t = { id: '1' };
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
                vm.teacher = {
                    "profileDescription": 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
                    "acceptGameRules": 0,
                    "accountHolderIdentification": "b",
                    "accountHolderName": "b",
                    "accountNumber": "1",
                    "accountType": "b",
                    "address": "Calle 186a 19 26",
                    "bank": "b",
                    "cellPhone": "3156162524",
                    "city": "Bogotá DC",
                    "courses": [
                        "4a1c24fd-6a37-437d-bc1b-894f394b5657",
                        "857ea1a5-5511-44a8-a271-482cc22772ff",
                        "663e2cd9-e59f-49c7-a349-a300af07c410",
                        "4b2c97e3-8f31-4a4f-ab45-1a9557b89054",
                        "9dcc91de-721f-4757-a1a5-61043f93e7c0",
                        "fa5096ec-2236-4a29-a50e-9185f9cba928",
                        "720dbd19-3de8-47cc-b0b4-8b1e3dd97de2",
                        "1d117bb8-cf22-460a-ba40-b542f5855595",
                        "c8f100ba-30bd-4ae7-bbc9-425340829a37",
                        "b9f7abc3-32c4-43bf-b788-6720cda028fc",
                        "fe56d2cd-2da3-4627-a949-668c971b695c",
                        "34b8ecd1-ddfb-4ab1-93bc-08807f76698a",
                        "c7736c0c-af96-4839-b51a-2a372ece9ff2"
                    ],
                    "email": "diego@mensajerosurbanos.com",
                    "exam": {
                        "correctAnswers": 0,
                        "idExam": " ",
                        "passExam": 0,
                        "wrongAnswers": 0
                    },
                    "gradeDate": "2017-02-01T05:00:00.000Z",
                    "id": "7dfd7f6b-f6fc-4d27-9c37-e43ce063c300",
                    "identification": "1020",
                    "lastName": "Diego",
                    "name": "Mensajeros",
                    "neighborhood": "v",
                    "password": "$2a$10$lN4iMJagv5x8gdUulNGhwuNMnms33QlIg5rYwAnRUMXzcYPPSwO5u",
                    "phone": "3156162527",
                    "profession": "e",
                    "schedule": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    "semester": 6,
                    "state": 2,
                    "university": "e",
                    "universityAddress": "e"
                };
                vm.teacher.gradeDateMoment = moment(vm.teacher.gradeDate).format('MMMM Do YYYY');

                CourseServices.getAll()
                    .then(function (response) {
                        vm.courses = response;
                        vm.teacher.courses = vm.courses.filter(function (course) {
                            return vm.teacher.courses.indexOf(course.id) > -1;
                        });
                    });
            }

            initCtrl();
        });
})();