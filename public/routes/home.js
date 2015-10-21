'use strict';
angular.module('seedApp')
.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {
    var path = 'public/views';
    // PUBLIC
    $stateProvider.state('main', {
      url: '/',
      templateUrl: path + '/index.html',
      controller: 'MainController'
    });
    //ESTUDIANTE
    $stateProvider.state('estudiante', {
      url: '/estudiante',
      templateUrl: path + '/estudiante/index.html',
      controller: 'estudianteController'
    });

    $stateProvider.state('estudiante.Editar', {
      url: '/listar',
      templateUrl: path + '/estudiante/paginas/Editar.html',
      controller: 'estudianteController'
    });

     $stateProvider.state('estudiante.enviarMensaje', {
      url: '/nuevo',
      templateUrl: path + '/estudiante/paginas/EnviarMensaje.html',
      controller: 'estudianteController'
    });
     $stateProvider.state('estudiante.reporte', {
      url: '/reporte',
      templateUrl: path + '/estudiante/paginas/reporteEstudiante.html',
      controller: 'estudianteController'
    });

    $urlRouterProvider.otherwise('/');
  }
]);
