(function () {
    'use strcit';

    angular.module('interviewModule')
        .controller('InterviewCreateController', function ($location, localStorageService, InterviewServices) {
            var vm = this;

            vm.create = function () {
                var interview = angular.copy(vm.interview);
                interview.startDateTime = new Date(interview.startDateTime).getTime();
                InterviewServices.create(interview)
                    .then(function (response) {
                        localStorageService.set('selectedInterview', response);
                        $location.path('/interviews/detail');
                    }, function (error) {
                        alertify.log('No ha sido posible crear la entrevista: ' + error.data.message, 'error', 0);
                    });
            }

            function initCtrl() {
                var now = new Date();
                angular.element('#startDateTime').fdatepicker({
                    format: 'mm-dd-yyyy hh:ii',
                    disableDblClickSelection: true,
                    language: 'es',
                    pickTime: true,
                    leftArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
                    rightArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
                    closeButton: true,
                    closeIcon: '<i class="fa fa-times" aria-hidden="true"></i>',
                    onRender: function (date) {
                        return date.valueOf() < now.valueOf() ? 'disabled' : '';
                    }
                });
                vm.interview = {};
            }

            initCtrl();
        });
})();