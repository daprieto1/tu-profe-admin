(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('TeachersController', function ($scope, ServiceTeachers) {
            var vm = this;

            function initCtrl() {
                ServiceTeachers.getAll()
                    .then(function (teachers) {
                        vm.teachers = teachers;
                        console.log(vm.teachers);
                    });
            }

            initCtrl();
        });
})();