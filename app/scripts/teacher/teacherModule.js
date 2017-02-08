(function () {
    'use strict';

    angular.module('teacherModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/link-up', {
                    templateUrl: 'views/teacher/linkUp.html'
                });
        });
})();