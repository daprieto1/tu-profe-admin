(function () {
    'use strict';

    angular.module('professionModule')
        .controller('ProfessionDetailController', function ($scope, localStorageService) {
            var vm = this;

            function initCtrl() {
                vm.profession = localStorageService.get('selectedProfession');
            }

            initCtrl();
        });
})();