'use strict';

angular.module('seedApp').factory('Estudiante', ['$resource',
  function($resource) {
    return $resource('localhost/order-control/api/estudianteController/estudianteModel', {
    }, {
      save: {
           method: 'POST'
       },
      get: {
        method: 'GET',
        isArray: true
      },
      update: {
        url: 'localhost/order-control/api/estudianteController/estudianteModel/Id_estudiante/:Id_estudiante',
        method: 'PUT'
      },
      delete: {
        url: 'localhost/order-control/api/estudianteController/estudianteModel/Id_estudiante/:Id_estudiante',
        method: 'DELETE'
      }
    });
  }
]);
