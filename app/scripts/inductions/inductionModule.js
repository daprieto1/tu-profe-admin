(function () {
    'use strict';

    angular.module('inductionModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/inductions', {
                    templateUrl: 'views/induction/inductions.html'
                })
                .when('/inductions/create', {
                    templateUrl: 'views/induction/createInduction.html'
                })
                .when('/inductions/detail', {
                    templateUrl: 'views/induction/detailInduction.html'
                });
        });
})();