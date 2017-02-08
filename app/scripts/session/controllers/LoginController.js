(function () {
    'use strict';

    angular.module('sessionModule')
        .controller('LoginController', function ($rootScope, $location, $cookies, ServiceSession) {
            var vm = this;

            vm.login = function () {
                $rootScope.loginAdminUser(vm.username, vm.password)
                    .then(undefined, function (error) {
                        console.log(error);
                    });
            };

            function initCtrl() {
                vm.password = undefined;
                vm.username = undefined;
            }

            initCtrl();
        });
})();