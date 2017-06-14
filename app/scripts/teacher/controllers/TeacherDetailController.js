(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('TeacherDetailController', function ($scope, $q, localStorageService, SchoolServices,  ProfessionServices, CourseServices, ServiceTeachers, ServiceSchedulers) {
            var vm = this;
            
            vm.render = ()=>{
                vm.calendar = angular.element('#schedule').fullCalendar({
                    header: {
                        left: '',
                        center: '',
                        right: ''
                    },
                    defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                    defaultView: 'agendaWeek',
                    columnFormat: 'dddd',
                    events: vm.events,
                    eventClick: function (calEvent, jsEvent, view) {
                        alertify.confirm('¿Seguro deseas eliminar esta sección?', (e) => {
                            if (e) {
                                var section = vm.events.find(event=>{return event.id === calEvent._id}).section;
                                ServiceSchedulers.deleteSection(vm.teacherId,section)
                                    .then(()=>vm.calendar.fullCalendar('removeEvents', calEvent._id))
                                    .catch(err=>console.log(err));    
                            }
                        });
                    }
                });    
            };
            
            function getTeacher(teacherId) {
                $q.all([
                    SchoolServices.getAll(),
                    ProfessionServices.getAll(),
                    CourseServices.getAll(),
                    ServiceTeachers.getTeacher(vm.teacher.id)
                ])
                    .then(([schools, professions, courses, teacher]) => {
                        vm.originalTeacher = angular.copy(teacher);

                        teacher.courses = teacher.courses || [];
                        teacher.courses = courses.filter(function (course) {
                            return teacher.courses.indexOf(course.id) > -1;
                        });

                        vm.teacher = teacher;
                    });
                
                ServiceSchedulers.getSchedule(vm.teacher.id)
                    .then(schedule => {
                        vm.schedule = schedule;
                        schedule.days.forEach(day => {
                            vm.events = vm.events.concat(day.sections.map(section => { return ServiceSchedulers.parseSectionToEvent(section); }));
                        });
                    });
            }

            function initCtrl() {
                vm.editProfileData = false;
                vm.basicDataView = true;

                vm.ready = false;
                vm.events = [];
                vm.teacher = localStorageService.get('selectedTeacher');
                vm.teacher.gradeDateMoment = moment(vm.teacher.gradeDate).format('MMMM Do YYYY');

                if (angular.isDefined(vm.teacher) && angular.isDefined(vm.teacher.id)) {
                    getTeacher(vm.teacher.id);
                } else {
                    $location.path('/teachers');
                }

            }

            initCtrl();
        });
})();