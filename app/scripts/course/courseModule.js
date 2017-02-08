(function () {
    'use strict';

    angular.module('courseModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/courses', {
                    templateUrl: 'views/course/courses.html'
                })
                .when('/courses/create', {
                    templateUrl: 'views/course/createCourse.html'
                })
                .when('/courses/detail', {
                    templateUrl: 'views/course/detailCourse.html'
                });
        });

})();