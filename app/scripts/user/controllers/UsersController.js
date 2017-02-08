(function () {

    'use strict';

    angular.module('userModule')
        .controller('UsersController', function (UserServices) {
            var vm = this;
            function initCtrl() {
                UserServices.getAll()
                    .then(function (response) {
                        vm.users = response;
                    });
            }
            initCtrl();
        });
})();