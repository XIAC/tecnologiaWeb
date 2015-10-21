'use strict';

angular.module('seedApp')
.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    var path = 'localhost/order-control/public/views/contact';

    $stateProvider.state('main.contact', {
      url: 'contact',
      templateUrl: path + '/contact.html',
      controller: 'ContactController'
    });
  }
]);
