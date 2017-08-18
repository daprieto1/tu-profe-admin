(function () {
    'use strict';

    angular.module('teacherModule')
        .controller('TeacherDetailController', function ($scope, $q, $timeout, localStorageService, SchoolServices, ProfessionServices, CourseServices, ServiceTeachers, ServiceSchedulers, ServiceAdvisoryServices) {
            var vm = this;

            vm.renderCalendar = () => {
                $timeout(() => {
                    vm.fullCalendarCalendar = angular.element('#calendar').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                        defaultView: 'month',
                        editable: true,
                        events: vm.eventsCalendar
                    });
                }, 500);
            };

            vm.renderSchedule = () => {
                $timeout(() => {
                    vm.fullCalendarSchedule = angular.element('#schedule').fullCalendar({
                        header: {
                            left: '',
                            center: '',
                            right: ''
                        },
                        defaultDate: moment().startOf('week').format('YYYY-MM-DD'),
                        defaultView: 'agendaWeek',
                        columnFormat: 'dddd',
                        events: vm.eventsSchedule,
                        eventClick: function (calEvent, jsEvent, view) {
                            alertify.confirm('¿Seguro deseas eliminar esta sección?', (e) => {
                                if (e) {
                                    var section = vm.events.find(event => { return event.id === calEvent._id }).section;
                                    ServiceSchedulers.deleteSection(vm.teacherId, section)
                                        .then(() => vm.calendar.fullCalendar('removeEvents', calEvent._id))
                                        .catch(err => console.log(err));
                                }
                            });
                        }
                    });
                }, 500);
            };

            function getSchedule(teacherId) {
                ServiceSchedulers.getSchedule(teacherId)
                    .then(schedule => {
                        vm.schedule = schedule;
                        schedule.days.forEach(day => {
                            vm.eventsSchedule = vm.eventsSchedule.concat(day.sections.map(section => { return ServiceSchedulers.parseSectionToEvent(section); }));
                        });
                    });
            }

            function getCalendar(teacher) {                
                var requests = teacher.advisoryServices.map(advisoryService => { return ServiceAdvisoryServices.getAdvisoryService(advisoryService); });
                $q.all(requests)
                    .then(advisoryServices => {
                        advisoryServices.forEach(advisoryService => {
                            vm.eventsCalendar = vm.eventsCalendar.concat(ServiceAdvisoryServices.parseAdvisoryServiceToEvent(advisoryService));
                        });
                    });
            }

            function getTeacher(teacherId) {
                return $q.all([
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

                        teacher.university = schools.find(school => school.id === vm.originalTeacher.university);
                        teacher.profession = professions.find(profession => profession.id === vm.originalTeacher.profession);

                        vm.teacher = teacher;
                        console.log(vm.teacher);
                        return Promise.resolve(vm.teacher);
                    });
            }

            function initCtrl() {
                vm.editProfileData = false;
                vm.basicDataView = true;

                vm.ready = false;
                vm.eventsSchedule = [];
                vm.eventsCalendar = [];
                vm.teacher = localStorageService.get('selectedTeacher');

                if (angular.isDefined(vm.teacher) && angular.isDefined(vm.teacher.id)) {
                    getTeacher(vm.teacher.id)
                        .then(teacher => getCalendar(teacher));
                    getSchedule(vm.teacher.id);
                } else {
                    $location.path('/teachers');
                }

            }

            initCtrl();
        });
})();