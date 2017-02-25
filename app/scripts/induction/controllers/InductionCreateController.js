(function () {
    'use strcit';

    angular.module('inductionModule')
        .controller('InductionCreateController', function ($location, localStorageService, InductionServices) {
            var vm = this;

            vm.create = function () {
                var induction = angular.copy(vm.induction);
                induction.startDateTime = (new Date(vm.induction.startDateTime)).getTime();

                InductionServices.create(induction)
                    .then(function (response) {
                        localStorageService.set('selectedInduction', response);
                        $location.path('/inductions/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la capacitación: ' + error.data.message, 'error', 0);
                    });
            };

            function initCtrl() {
                vm.induction = {};
                angular.element('#startDateTime').fdatepicker({
                    format: 'yyyy-mm-dd hh:ii',
                    disableDblClickSelection: true,
                    language: 'es',
                    pickTime: true,
                    leftArrow: '<<',
                    rightArrow: '>>',
                    closeIcon: 'X',
                    closeButton: true
                });
            }

            initCtrl();
        });
})();