(function(){
    'use strict';
    
    angular.module('advisoryServiceModule', [])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/advisory-services', {
                    templateUrl: 'views/advisoryService/advisoryServices.html'
                })
                .when('/advisory-services/detail', {
                    templateUrl: 'views/advisoryService/detailAdvisoryService.html'
                });
        });
})();