(function () {
    'use strict';

    angular.module('teacherModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/link-up', {
                    templateUrl: 'views/teacher/linkUp.html'
                })
                .when('/link-up-teachers', {
                    templateUrl: 'views/teacher/linkUpTeachers.html'
                })
                .when('/teachers', {
                    templateUrl: 'views/teacher/teachers.html'
                })
                .when('/teachers/detail', {
                    templateUrl: 'views/teacher/detailTeacher.html'
                });
        });
})();