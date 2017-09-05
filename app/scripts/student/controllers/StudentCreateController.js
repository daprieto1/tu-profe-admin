(function () {
    'use strict';

    angular.module('studentModule')
        .controller('StudentCreateController', function (ServiceSession) {
            var vm = this;

            vm.create = () => {
                ServiceSession.signUpStudent(vm.student)
                    .then()
                    .catch(err => alertify.log('No ha sido posible crear el Estudiante: ' + error.data, 'error', 0));
            };

            function initCtrl() {
                vm.student = {};
            }

            initCtrl();
        });
})();