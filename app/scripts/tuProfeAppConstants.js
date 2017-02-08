(function () {

    'use strict';

    angular.module('tuProfeApp')

        .constant('TU_PROFE_API', 'http://localhost:8080')

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

        .constant('COURSE_AREAS', [
            {
                id: 1,
                label: 'Colegio'
            }, {
                id: 2,
                label: 'Idioma'
            }, {
                id: 3,
                label: 'Profundización'
            }, {
                id: 4,
                label: 'Física'
            }, {
                id: 5,
                label: 'Música'
            }, {
                id: 6,
                label: 'Biología'
            }, {
                id: 7,
                label: 'Química'
            }, {
                id: 8,
                label: 'Matemáticas'
            }, {
                id: 9,
                label: 'Programas'
            }
        ])

        .constant('COURSE_CLASSIFICATIONS', [
            {
                id: 1,
                label: 'Regular'
            }, {
                id: 2,
                label: 'Idiomas'
            }, {
                id: 3,
                label: 'Especializado'
            }, {
                id: 4,
                label: 'Música'
            },
        ]);
})();