(function () {
    'use strict';

    angular.module('interviewModule')
        .controller('InterviewDetailController', function ($location, localStorageService) {
            var vm = this;
            function initCtrl() {
                vm.interview = localStorageService.get('selectedInterview');
                if (angular.isUndefined(vm.interview)) {
                    $location.path('/interviews');
                } else {
                    vm.interview.momentDate = moment(vm.interview.startDateTime).format('LLL');
                }
            }
            initCtrl();
        });
})();