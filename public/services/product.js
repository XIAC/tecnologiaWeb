'use strict';

angular.module('seedApp').factory('Product', ['$resource',
  function($resource) {
    return $resource('localhost/order-control/api/productController/product', {
    }, {
      save: {
           method: 'POST'
       },
      get: {
        method: 'GET',
        isArray: true
      },
      update: {
        url: 'localhost/order-control/api/productController/product/ID_ITEM/:ID_ITEM',
        method: 'PUT'
      },
      delete: {
        url: 'localhost/order-control/api/productController/product/ID_ITEM/:ID_ITEM',
        method: 'DELETE'
      }
    });
  }
]);