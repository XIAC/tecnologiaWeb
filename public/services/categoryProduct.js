'use strict';

angular.module('seedApp').factory('categoryProduct', ['$resource',
  function($resource) {
    return $resource('localhost/order-control/api/categoryProductController/categoryProduct', {
    }, {
      save: {
           method: 'POST'
       },
      get: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'POST'
      },
       delete: {
        url: './api/categoryProductController/categoryProduct/ID_CATEGORIA_ITEM/:ID_CATEGORIA_ITEM',
        method: 'DELETE'
      }
    });
  }
]);
