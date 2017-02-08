(function () {
    'use strict';

    angular.module('teacherModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/link-up', {
                    templateUrl: 'views/teacher/linkUp.html'
                })
                .when('/teachers', {
                    templateUrl: 'views/teacher/teachers.html'
                })
                .when('/teachers/detail', {
                    templateUrl: 'views/teacher/detailTeacher.html'
                });
        });
})();