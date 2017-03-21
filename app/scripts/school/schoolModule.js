(function () {
    'use strict';

    angular.module('schoolModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/schools', {
                    templateUrl: 'views/school/schools.html'
                })
                .when('/schools/create', {
                    templateUrl: 'views/school/createSchool.html'
                })
                .when('/schools/detail', {
                    templateUrl: 'views/school/detailSchool.html'
                });
        });
})();