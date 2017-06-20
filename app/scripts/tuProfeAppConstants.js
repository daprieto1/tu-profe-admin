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
        ])

        .constant('SESSION_STATES', [
            {
                id: 0,
                label: 'Pendiente'
            }, {
                id: 1,
                label: 'En Proceso'
            }, {
                id: 2,
                label: 'Terminada'
            }, {
                id: 3,
                label: 'Congelada'
            }
        ])
        
        .constant('ADVISORY_SERVICE_STATES', [
            {
                id: 1,
                label: 'Creado'
            }, {
                id: 2,
                label: 'Pagado'
            }, {
                id: 3,
                label: 'Disponible'
            }, {
                id: 4,
                label: 'En Proceso'
            }, {
                id: 5,
                label: 'Terminado'
            }, {
                id: 6,
                label: 'Cancelado'
            }
        ]);
})();