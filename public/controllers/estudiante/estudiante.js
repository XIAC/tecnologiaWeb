'use strict';
angular.module('seedApp')

.controller('estudianteController', ['$scope', 'Estudiante', '$location','$window','$routeParams','$stateParams', '$state',
  function($scope, Estudiante,$location,$window,$routeParams,$stateParams, $state) {

    $scope.estudiantes = [];
    Estudiante.get({}, function(response) {
      console.log(response);
      $scope.estudiantes = response;
    });
    

    $scope.item = {};
    
    $scope.saveEstudiante = function(item) {
      console.log(item);
      Estudiante.save(item, function(response) {
      $scope.estudiantes.push(response);
      console.log(response);
      });
    }
     $scope.deleteEstudiante = function (estudiante,idx) {
        console.log(estudiante);
        estudiante.$delete({ "Id_estudiante": estudiante.Id_estudiante }, function (success) {
        console.log(success);
        $scope.estudiantes.splice(idx, 1);
        });
    }

    $scope.pdfMaker = function(estudiante){
      var str = "" + estudiante.Id_estudiante;
      str += estudiante.nombre;
      str += estudiante.paterno;
      str += estudiante.materno; 
        var docDefinition = {
        content:{
        table: {
        headerRows: 1,
        widths: [ 'auto', 'auto', '*', 'auto' ],
        body: [
          [ 'Id_estudiante', 'nombre ', 'paterno', 'materno'],
          [ estudiante.Id_estudiante,estudiante.nombre,estudiante.paterno,estudiante.materno]
              ]
            }
        }           };  
       //pdfMake.createPdf(docDefinition).download('productos.pdf');
         pdfMake.createPdf(docDefinition).open();
    }

    $scope.pdfall = function() {
      var str = "";
      var docDefinition = "";
      var estudiantes = $scope.estudiantes;

      estudiantes.forEach(function(estudiante) {
       str += estudiante.Id_estudiante;
       str += estudiante.nombre;
       str += estudiante.paterno;
       str += estudiante.materno;  
      });

      docDefinition = {
        content: {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto' ],
            body: [
              [ 'Id Estudiante', 'Id Categoria ', 'Descripción', 'Stock' ],
              [ str,str,str,str]
            ]
          }
        }          
      };  
  
       // pdfMake.createPdf(docDefinition).download('productos.pdf');
      pdfMake.createPdf(docDefinition).open();  
    }

    $scope.updateEstudiante = function(estudiante) {
      console.log(estudiante);
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'ln',
        resolve: {
          estudiante: function() {
            return estudiante;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
   
    $scope.cancel = function () {
            var url='#/estudiante/nuevoEstudiante';
            //categoryProduct.save($scope.item);
           // $location.path('/categoriaProducto');
            $window.location.href=url;
    }
    $scope.btnEditarClick = function (item) {
        var url='#/estudiante/editEstudiante/';
            console.log(item);
        $window.location.href = url+item.Id_estudiante;
        
    }
    $scope.updateEstudiante = function (item) {
          var url='#/estudiante/nuevoEstudiante';
          var Id_estudiante=$stateParams.Id_estudiante; 
            if (Id_estudiante>0) {
              item.Id_estudiante=Id_estudiante;
              Estudiante.save(item);
              console.log(item);
            } 
            Estudiante.get({}, function(response) {
              $scope.estudiantes = response;
            });
           // $location.path('/categoriaProducto');
          $window.location.href=url;
    }
  }
]);




