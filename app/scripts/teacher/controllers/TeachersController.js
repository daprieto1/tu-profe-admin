(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('TeachersController', function ($scope, $location, $q, localStorageService, ServiceTeachers, SchoolServices, ProfessionServices, CourseServices) {
            var vm = this;

            vm.selectTeacher = function (teacher) {
                localStorageService.set('selectedTeacher', teacher);
                $location.path('/teachers/detail');
            };

            function initCtrl() {

                $q.all([
                    SchoolServices.getAll(),
                    ProfessionServices.getAll(),
                    CourseServices.getAll()
                ])
                    .then(([schools, professions, courses]) => {

                        ServiceTeachers.getAll()
                            .then(function (teachers) {
                                vm.teachers = teachers.map(teacher => {
                                    teacher.momentGradeDate = moment(teacher.gradeDate).format('LLL');                                    

                                    teacher.university = schools.find(school => {
                                        return school.id === teacher.university;
                                    });

                                    teacher.profession = professions.find(profession => {
                                        return profession.id === teacher.profession;
                                    });

                                    teacher.courses = teacher.courses || [];
                                    teacher.courses = courses.filter(function (course) {
                                        return teacher.courses.indexOf(course.id) > -1;
                                    });

                                    return teacher;
                                });

                            });
                    });
            }

            initCtrl();
        });
})();