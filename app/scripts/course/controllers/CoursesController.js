(function () {
    'use strict';

    angular.module('courseModule')
        .controller('CoursesController', function ($location, localStorageService, CourseServices) {
            var vm = this;

            vm.selectCourse = function (course) {
                localStorageService.set('selectedCourse', course);
                $location.path('/courses/detail');
            };

            function initCtrl() {
                vm.courses = [];
                CourseServices.getAll()
                    .then(function (response) {
                        console.log('here',response);
                        vm.courses = response;
                    });
            }

            initCtrl();
        });
})();