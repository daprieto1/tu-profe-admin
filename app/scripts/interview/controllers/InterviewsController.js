(function () {
    'use strcit';

    angular.module('interviewModule')
        .controller('InterviewsController', function ($location, localStorageService, InterviewServices) {
            var vm = this;

            vm.selectInterview = function (interview) {
                localStorageService.set('selectedInterview', interview);
                $location.path('/interviews/detail');
            };

            function initCtrl() {
                vm.interviews = [];
                InterviewServices.getAll()
                    .then(function (response) {
                        vm.interviews = response;
                        vm.interviews.forEach(function (interview) {
                            interview.momentDate = moment(interview.startDateTime).format('LLL');
                        });
                    });
            }
            initCtrl();
        });
})();