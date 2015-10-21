'use strict';

angular.module('seedApp').factory('Person', ['$resource',
  function($resource) {
    return $resource('localhost/order-control/api/demo/person', {
    }, {
      // save: {
      //     method: 'POST'
      // },
      get: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'PUT'
      }
    });
  }
]);
