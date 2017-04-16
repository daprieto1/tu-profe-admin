(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('TeacherDetailController', function ($scope, localStorageService) {
            var vm = this;
            
            function initCtrl() {
                vm.teacher = localStorageService.get('selectedTeacher');
                console.log(vm.teacher);
            }

            initCtrl();
        });
})();