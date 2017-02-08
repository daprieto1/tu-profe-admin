(function () {

    'use strict';

    angular.module('userModule')
        .controller('UserCreateController', function (localStorageService, ServiceSession) {
            var vm = this;

            vm.create = function () {
                ServiceSession.signUpAdminUser(vm.user)
                    .then(function (response) {
                        localStorageService.set('selectedUser', response);
                    }, function (error) {
                        alertify.log('No ha sido posible crear el usuario: ' + error.data.message, 'error', 0);
                    });
            };

            function initCtrl() {

            }

            initCtrl();
        });
})();