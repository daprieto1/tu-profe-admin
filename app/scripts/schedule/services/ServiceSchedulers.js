(function(){
    'use strict';
    angular.module('scheduleModule')
        .factory('ServiceSchedulers', function ($resource, $http, envService) {
            var TU_PROFE_API = envService.read('apiUrl');
            var Schedule = $resource(TU_PROFE_API + '/schedules/:id', { id: '@id' }, {
                addSection: {
                    headers: { 'Content-Type': 'application/json' },
                    url: TU_PROFE_API + '/schedules/:scheduleId/sections',
                    method: 'POST'
                }
            });
            
            var parseTime = (time) => {
                var time = time < 1000 ? '0' + time : time + '';
                return [time.substr(0, 2), time.substr(2, 2), '00'].join(':');
            };

            return {
                getSchedule: id => {
                    return Schedule.get({ id: id }).$promise;
                },

                addSection: (scheduleId, section) => {
                    return Schedule.addSection({ scheduleId: scheduleId }, section).$promise;
                },
                
                deleteSection: (scheduleId, section) => {
                    return $http({
                        method: 'DELETE',
                        url:TU_PROFE_API + '/schedules/'+scheduleId+'/sections',
                        data: section,
                        headers: {'Content-Type': 'application/json'}
                    });
                },
                
                parseSectionToEvent: (section) => {
                    var date = moment().day(section.day).format('YYYY-MM-DD');
                    return {
                        id: section.id,
                        title: 'Horario disponible',
                        start: date + 'T' + parseTime(section.startTime),
                        end: date + 'T' + parseTime(section.endTime),
                        section: section
                    };
                }
            }
        });
})();