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
        'sessionModule',
        'dashboardModule',
        'courseModule',
        'interviewModule',
        'inductionModule',
        'trainingModule',
        'teacherModule',
        'userModule'
    ])

        .config(function ($routeProvider, $locationProvider, $cookiesProvider, localStorageServiceProvider, angularPromiseButtonsProvider) {


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