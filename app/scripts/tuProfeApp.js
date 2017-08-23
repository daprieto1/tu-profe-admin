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
        'professionModule',
        'advisoryServiceModule',
        'scheduleModule',
        'studentModule'
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
                    c9: ['tu-profe-front-diegoprieto.c9users.io'],
                    heroku: ['tu-profe-front.herokuapp.com'],
                    AWS_DEV: ['ec2-52-10-106-252.us-west-2.compute.amazonaws.com']
                },
                vars: {
                    local: {
                        apiUrl: 'http://localhost:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    c9: {
                        apiUrl: 'https://tu-profe-api-node-diegoprieto.c9users.io:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    heroku: {
                        apiUrl: 'https://tu-profe-api-node.herokuapp.com/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    },
                    AWS_DEV: {
                        apiUrl: 'http://52.10.106.252:8080/api',
                        S3TuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe',
                        CloudFrontTuProfe: 'https://s3-us-west-2.amazonaws.com/tu-profe'
                    }
                }
            });
            
            envServiceProvider.check();

        })

        .run(function ($rootScope) {

            $rootScope.cloudFront = {
                domainName: 'http://dl7v16017ye41.cloudfront.net'
            };

            $rootScope.$apply(function () {
                angular.element(document).foundation();
            });

        });

})();