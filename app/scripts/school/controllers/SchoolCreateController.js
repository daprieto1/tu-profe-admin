(function () {
    'use strcit';

    angular.module('schoolModule')
        .controller('SchoolCreateController', function ($location, localStorageService, SchoolServices, SCHOOL_TYPES) {
            var vm = this;

            vm.create = function () {
                SchoolServices.create(vm.school)
                    .then(function (response) {
                        localStorageService.set('selectedSchool', response);
                        $location.path('/schools/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la Institución: ' + error.data.message, 'error', 0);
                    });
            }

            function initCtrl() {
                vm.school = {};
                vm.schoolTypes = SCHOOL_TYPES;
            }
            
            initCtrl();
        });
})();