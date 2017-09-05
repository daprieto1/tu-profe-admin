(function () {
    'use strict';

    angular.module('studentModule')
        .controller('StudentsController', function (ServiceStudents) {
            var vm = this;

            function initCtrl() {
                ServiceStudents.getAll()
                    .then(students => {
                        vm.students = students;
                    });
            }

            initCtrl();
        });
})();