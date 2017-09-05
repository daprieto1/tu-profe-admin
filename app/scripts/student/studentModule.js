(function () {
    'use strict';
    angular.module('studentModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/students', {
                    templateUrl: 'views/student/students.html'
                })
                .when('/students/create', {
                    templateUrl: 'views/student/createStudent.html'
                })
                .when('/students/detail', {
                    templateUrl: 'views/student/detailStudent.html'
                });
        });
})();