(function () {
    'use strcit';

    angular.module('professionModule')
        .controller('ProfessionCreateController', function ($location, localStorageService, ProfessionServices) {
            var vm = this;

            vm.create = function () {
                var profession = angular.copy(vm.profession);
                ProfessionServices.create(profession)
                    .then(function (response) {
                        localStorageService.set('selectedProfession', response);
                        $location.path('/professions/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la Profesión: ' + error.data.message, 'error', 0);
                    });
            }

            function initCtrl() {
                vm.profession = {};
            }
            
            initCtrl();
        });
})();