(function () {
    'use strict';
    angular.module('advisoryServiceModule')
        .controller('AdvisoryServiceDetailController', function ($timeout, localStorageService, ServiceStudents, ServiceAdvisoryServices, SESSION_STATES) {
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

            function initCtrl() {
                vm.basicDataView = true;
                vm.eventsCalendar = [];
                vm.advisory = localStorageService.get('selectedAdvisory');

                ServiceStudents.getStudent(vm.advisory.studentId)
                    .then(student => vm.student = student);

                vm.eventsCalendar = vm.eventsCalendar.concat(ServiceAdvisoryServices.parseAdvisoryServiceToEvent(vm.advisory));
                vm.advisory.createdAtShow = moment(vm.advisory.createdAt).format('LL');
                vm.advisory.startDateShow = moment(vm.advisory.startDate).format('LL');
                vm.advisory.sessions = vm.advisory.sessions.map(session => {
                    session.startDateToShow = moment(session.startDate).format('LL');
                    session.numHours = session.duration / 60;
                    session.state = SESSION_STATES.find(state => {
                        return state.id === session.state;
                    });
                    return session;
                });
            }

            initCtrl();
        });
})();