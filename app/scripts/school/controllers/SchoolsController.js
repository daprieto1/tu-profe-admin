(function () {
    'use strcit';

    angular.module('schoolModule')
        .controller('SchoolsController', function ($location, localStorageService, SchoolServices, SCHOOL_TYPES) {
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
                        vm.schools.map(school => {
                            school.type = SCHOOL_TYPES.find(schoolType => {
                                return school.type === schoolType.id;
                            });
                            return school;
                        });
                    });
            }
            
            initCtrl();
        });
})();