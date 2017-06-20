(function () {
    angular.module('advisoryServiceModule')
        .controller('AdvisoryServicesController', function ($location, localStorageService, ServiceAdvisoryServices, ADVISORY_SERVICE_STATES) {
            var vm = this;

            vm.selectAdvisory = (advisory) => {
                localStorageService.set('selectedAdvisory', advisory);
                $location.path('/advisory-services/detail');
            };

            function initCtrl() {
                ServiceAdvisoryServices.filter({})
                    .then(advisories => {
                        advisories.map(advisory => {
                            advisory.createdAtShow = moment(advisory.createdAt).format('MMMM Do YYYY, h:mm a');
                            advisory.startDateShow = moment(advisory.startDate).format('MMMM Do YYYY, h:mm a');
                            advisory.state = ADVISORY_SERVICE_STATES.find(state => { return state.id === advisory.state });
                            return advisory;
                        });
                        vm.advisories = advisories;
                    });
            }

            initCtrl();
        });
})();