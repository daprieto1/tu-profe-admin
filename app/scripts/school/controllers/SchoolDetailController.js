(function () {
    'use strict';

    angular.module('schoolModule')
        .controller('SchoolDetailController', function ($scope, localStorageService) {
            var vm = this;

            function initMap() {
                console.log(vm.school);
                console.log(parseFloat(vm.school.latitude));
                console.log(vm.school.latitude);
                var address = { lat: parseFloat(vm.school.latitude), lng: parseFloat(vm.school.longitude) };
                vm.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 16,
                    center: address,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                var marker = new google.maps.Marker({
                    position: address,
                    map: vm.map
                });
            }

            function initCtrl() {
                vm.school = localStorageService.get('selectedSchool');
                initMap();
            }

            initCtrl();
        });
})();