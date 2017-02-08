(function () {
    'use strcit';

    angular.module('interviewModule')
        .controller('InterviewCreateController', function ($location, localStorageService, InterviewServices) {
            var vm = this;

            vm.create = function () {
                InterviewServices.create(vm.interview)
                    .then(function (response) {
                        localStorageService.set('selectedInterview', response);
                        $location.path('/interviews/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la entrevista: ' + error.data.message, 'error', 0);
                    });
            }

            function initCtrl() {
                vm.interview = {};
            }
            initCtrl();
        });
})();