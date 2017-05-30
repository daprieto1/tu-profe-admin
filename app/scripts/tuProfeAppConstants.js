(function () {

    'use strict';

    angular.module('tuProfeApp')

        .constant('TU_PROFE_API', 'http://localhost:8080/api')

        .constant('TEACHER_STATES', {
            signUp: {
                id: 0,
                label: 'Registrado'
            }, curriculum: {
                id: 1,
                label: 'Curriculum'
            }, interview: {
                id: 2,
                label: 'En entrevista'
            }, inactive: {
                id: 3,
                label: 'Inactivo'
            }, active: {
                id: 4,
                label: 'Activo'
            }, rejected: {
                id: 5,
                label: 'Rechazado'
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