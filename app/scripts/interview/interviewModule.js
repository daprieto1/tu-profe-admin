(function () {
    'use strict';

    angular.module('interviewModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/interviews', {
                    templateUrl: 'views/interview/interviews.html'
                })
                .when('/interviews/create', {
                    templateUrl: 'views/interview/createInterview.html'
                })
                .when('/interviews/detail', {
                    templateUrl: 'views/interview/detailInterview.html'
                });
        });
})();