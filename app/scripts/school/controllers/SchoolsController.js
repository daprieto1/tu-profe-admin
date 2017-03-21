(function () {
    'use strcit';

    angular.module('schoolModule')
        .controller('SchoolsController', function ($location, localStorageService, SchoolServices) {
            var vm = this;

            vm.selectSchool = function (school) {
                localStorageService.set('selectedSchool', school);
                $location.path('/schools/detail');
            };

            function initCtrl() {
                vm.schools = [];
                SchoolServices.getAll()
                    .then(function (response) {
                        vm.schools = response;
                    });
            }
            
            initCtrl();
        });
})();