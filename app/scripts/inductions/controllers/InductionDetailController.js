(function () {
    'use strict';

    angular.module('inductionModule')
        .controller('InductionDetailController', function ($location, localStorageService) {
            var vm = this;
            function initCtrl() {
                vm.induction = localStorageService.get('selectedInduction');
                if (angular.isUndefined(vm.induction)) {
                    $location.path('/inductions');
                } else {
                    vm.induction.momentDate = moment(vm.induction.startDateTime).format('LLL');
                }
            }
            initCtrl();
        });
})();