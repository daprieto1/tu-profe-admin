(function () {
    'use strict';

    angular.module('courseModule')
        .controller('CourseDetailController', function ($location, localStorageService, CourseServices) {
            var vm = this;

            function initCtrl() {
                vm.course = localStorageService.get('selectedCourse');
            }

            initCtrl();
        });
})();