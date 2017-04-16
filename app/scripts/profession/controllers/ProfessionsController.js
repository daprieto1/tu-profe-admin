(function () {
    'use strcit';

    angular.module('professionModule')
        .controller('ProfessionsController', function ($location, localStorageService, ProfessionServices) {
            var vm = this;

            vm.selectProfession = function (profession) {
                localStorageService.set('selectedProfession', profession);
                $location.path('/professions/detail');
            };

            function initCtrl() {
                vm.professions = [];
                ProfessionServices.getAll()
                    .then(function (response) {
                        vm.professions = response;
                    });
            }
            
            initCtrl();
        });
})();