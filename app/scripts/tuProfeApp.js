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
        'angularPromiseButtons',
        'environment',
        'sessionModule',
        'dashboardModule',
        'courseModule',
        'interviewModule',
        'inductionModule',
        'trainingModule',
        'teacherModule',
        'userModule',
        'schoolModule',
        'professionModule'
    ])

        .config(function ($routeProvider, $locationProvider, $cookiesProvider, localStorageServiceProvider, angularPromiseButtonsProvider, envServiceProvider) {


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
                    templateUrl: '/login'
                });

            angularPromiseButtonsProvider.extendConfig({
                spinnerTpl: '<span class="fa fa-spinner spinner fa-spin" aria-hidden="true"></span>',
                disableBtn: true,
                btnLoadingClass: 'is-loading',
                addClassToCurrentBtnOnly: false,
                disableCurrentBtnOnly: false,
                minDuration: false,
                CLICK_EVENT: 'click',
                CLICK_ATTR: 'ngClick',
                SUBMIT_EVENT: 'submit',
                SUBMIT_ATTR: 'ngSubmit',
                BTN_SELECTOR: 'button'
            });

            envServiceProvider.config({
                domains: {
                    local: ['localhost'],
                    c9: ['tu-profe-api-node-diegoprieto.c9users.io' ],
                    heroku:['tu-profe-admin.herokuapp.com']
                },
                vars: {
                    local: {
                        apiUrl: 'http://localhost:8080/api'
                    },
                    c9: {
                        apiUrl: 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api'
                    },
                    heroku: {
                        apiUrl: 'https://tu-profe-api-node.herokuapp.com/api'
                    }
                }
            });
            
            envServiceProvider.check();

        })

        .run(function ($rootScope) {

            $rootScope.cloudFront = {
                domainName: 'http://d1ql3lvdg7tehd.cloudfront.net'
            };

            $rootScope.$apply(function () {
                angular.element(document).foundation();
            });

        });

})();