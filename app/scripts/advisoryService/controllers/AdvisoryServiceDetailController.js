(function () {
    'use strict';
    angular.module('advisoryServiceModule')
        .controller('AdvisoryServiceDetailController', function ($modal, $timeout, localStorageService, ServiceStudents, ServiceAdvisoryServices, SESSION_STATES) {
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

            vm.openAssingteacherModal = () => {
                var params = {
                    templateUrl: 'views/advisoryService/modals/assignTeacherModal.html',
                    resolve: {
                        advisoryServiceId: () => vm.advisory.id
                    },
                    controller: ($scope, $modalInstance, advisoryServiceId, ServiceTeachers, ServiceAdvisoryServices) => {
                        ServiceTeachers.getAll()
                            .then(teachers => {
                                $scope.teachers = teachers;
                            });

                        $scope.takeService = (teacher) => {
                            ServiceAdvisoryServices.assign(advisoryServiceId, teacher.id)
                                .then(response => {                                    
                                    alertify.success('Su solicitud de asignación ha sido enviada. Se le notificará al profesor la desición.');
                                    $modalInstance.close();
                                })
                                .catch(err => {
                                    alertify.error('La solucitud de asignación no ha podido ser enviada: ' + error.data.message);
                                });
                        };
                    }
                };

                var modalInstance = $modal.open(params);
                modalInstance.result.then(() => {
                    
                }, () => {
                    alertify.error('Ningún profesor fue seleccionado');
                });
            };

            function initCtrl() {
                vm.basicDataView = true;
                vm.eventsCalendar = [];
                vm.advisory = localStorageService.get('selectedAdvisory');
                console.log(vm.advisory);

                ServiceStudents.getStudent(vm.advisory.studentId)
                    .then(student => vm.student = student);

                vm.eventsCalendar = vm.eventsCalendar.concat(ServiceAdvisoryServices.parseAdvisoryServiceToEvent(vm.advisory));
                vm.advisory.createdAtShow = moment(vm.advisory.createdAt).format('LL');
                vm.advisory.startDateShow = moment(vm.advisory.startDate).format('LL');
                vm.advisory.sessions = vm.advisory.sessions.map(session => {
                    session.startDateToShow = moment(session.startDate).format('LL');
                    session.numHours = session.duration / 60;
                    session.realDuration = Math.round((session.realDuration ? session.realDuration : 0)/60000);
                    session.state = SESSION_STATES.find(state => {
                        return state.id === session.state;
                    });
                    return session;
                });
            }

            initCtrl();
        });
})();