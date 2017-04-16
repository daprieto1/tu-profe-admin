(function () {
    'use strict';
    angular.module('professionModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/professions', {
                    templateUrl: 'views/profession/professions.html'
                })
                .when('/professions/create', {
                    templateUrl: 'views/profession/createProfession.html'
                })
                .when('/professions/detail', {
                    templateUrl: 'views/profession/detailProfession.html'
                });
        });
})();