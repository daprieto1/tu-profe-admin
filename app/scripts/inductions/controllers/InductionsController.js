(function () {
    'use strcit';

    angular.module('inductionModule')
        .controller('InductionsController', function ($location, localStorageService, InductionServices) {
            var vm = this;

            vm.selectInduction = function (induction) {
                localStorageService.set('selectedInduction', induction);
                $location.path('/inductions/detail');
            };

            function initCtrl() {
                vm.inductions = [];
                InductionServices.getAll()
                    .then(function (response) {
                        vm.inductions = response;
                        vm.inductions.forEach(function (induction) {
                            induction.momentDate = moment(induction.startDateTime).format('LLL');
                        });
                    });
            }
            
            initCtrl();
        });
})();