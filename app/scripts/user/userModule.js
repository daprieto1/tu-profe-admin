(function () {

    'use strict';

    angular.module('userModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/users', {
                    templateUrl: 'views/user/users.html'
                })
                .when('/users/create', {
                    templateUrl: 'views/user/createUser.html'
                });
        });
})();