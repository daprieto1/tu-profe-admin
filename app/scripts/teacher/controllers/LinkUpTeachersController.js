(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('LinkUpTeachersController', function ($location, localStorageService, ServiceTeachers, TEACHER_STATES) {
            var vm = this;

            vm.getStateClass = teacher => {
                switch(teacher.state.id){                    
                    case 3:
                        return 'label alert';
                    case 0:
                    case 1:
                    default:
                        return 'label';
                }
            };

            vm.selectTeacher = teacher => {
                localStorageService.set('selectedTeacher', teacher);
                $location.path('/link-up');
            };

            function initCtrl() {
                vm.teachers = [];

                ServiceTeachers.getLinkUpTeachers()
                    .then(teachers => {
                        vm.teachers = teachers;
                        vm.teachers = vm.teachers.map(teacher => {
                            teacher.state = Object.values(TEACHER_STATES).find(function (element) { return element.id === teacher.state; });                            
                            return teacher;
                        });
                    });
            }

            initCtrl();
        });
})();