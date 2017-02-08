(function () {
    'use strict';

    angular.module('courseModule')
        .controller('CourseCreateController', function ($location, localStorageService, CourseServices, COURSE_AREAS, COURSE_CLASSIFICATIONS) {
            var vm = this;

            vm.create = function () {
                var course = angular.copy(vm.course);
                course.area = course.area.label;
                course.classification = course.classification.label;
                
                CourseServices.create(course)
                    .then(function (response) {
                        localStorageService.set('selectedCourse', response);
                        $location.path('/courses/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la materia: ' + error.data.message, 'error', 0);
                    });
            }

            function initCtrl() {
                vm.course = {};
                vm.courseAreas = COURSE_AREAS;
                vm.courseClassifications = COURSE_CLASSIFICATIONS;
            }

            initCtrl();
        });
})();