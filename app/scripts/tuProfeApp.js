(function () {

    'use strict';
    angular.isUndefinedOrNull = function (val) {
        return angular.isUndefined(val) || val === null
    }

    angular.module('tuProfeApp', [
        'ngRoute',
        'ngCookies',
        'ngResource',
        'mm.foundation',
        'multipleSelect',
        'LocalStorageModule',
        'sessionModule',
        'dashboardModule',
        'courseModule',
        'interviewModule',
        'trainingModule',
        'teacherModule',
        'userModule'
    ])

        .config(function ($routeProvider, $locationProvider, $cookiesProvider, localStorageServiceProvider) {


            $cookiesProvider.defaults.path = '/';
            localStorageServiceProvider
                .setPrefix('tu-profe')
                .setStorageType('localStorage');

            $routeProvider
                .when('/', {
                    templateUrl: 'views/dashboard/dashboard.html'
                })
                .when('/dashboard', {
                    templateUrl: 'views/dashboard/dashboard.html'
                })
                .when('/login', {
                    templateUrl: 'views/session/login.html'
                })                
                .otherwise({
                    templateUrl: '/'
                });

        })

        .run(function ($rootScope) {

            $rootScope.$apply(function () {
                angular.element(document).foundation();
            });

        });

})();