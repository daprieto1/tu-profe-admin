(function () {

    'use strict';

    angular.module('tuProfeApp')

        .constant('TU_PROFE_API', 'http://localhost:8080/api')

        .constant('TEACHER_STATES', {
            signUp: {
                id: 0
            }, curriculum: {
                id: 1
            }, interview: {
                id: 2
            }, inactive: {
                id: 3
            }, active: {
                id: 4
            }, rejected: {
                id: 5
            }
        })       

        .constant('COURSE_DIFFICULTIES', [
            {
                id: 1,
                label: 'Regular'
            }, {
                id: 2,
                label: 'Especializado'
            }
        ])

        .constant('SCHOOL_TYPES', [
            {
                id: 1,
                label: 'Universidad'
            }, {
                id: 2,
                label: 'Colegio'
            }
        ]);
})();