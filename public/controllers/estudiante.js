'use strict';
angular.module('seedApp')

.controller('estudianteController', ['$scope', 'estudiante','$location','$window','$routeParams','$stateParams', '$state',
  function($scope, estudiante,$location,$window,$routeParams,$stateParams, $state) {

    $scope.estudiantes = [];
    estudiante.get({}, function(response) {
      console.log(response);
      $scope.estudiantes = response;
    });
     
    $scope.item = {};
    
    $scope.saveEstudiante = function(item) {
      console.log(item);
      Product.save(item, function(response) {
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

    $scope.pdfMaker = function(product){
      var str = "" + product.Id_estudiante;
      str += product.Id_estudiante;
      str += product.ID_CATEGORIA_ITEM;
      str += product.DESCRIPCION;
      str += product.STOCK;
      str += product.PRECIO;
        var docDefinition = { content:{
        table: {
        headerRows: 1,
        widths: [ 'auto', 'auto', '*', 'auto','auto' ],
        body: [
          [ 'Id_estudiante', 'Id Categoria ', 'Descripción', 'Stock','Precio' ],
          [ product.Id_estudiante,product.ID_CATEGORIA_ITEM,product.DESCRIPCION,product.STOCK,product.PRECIO]
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

      estudiantes.forEach(function(product) {
       str += product.Id_estudiante;
       str += product.ID_CATEGORIA_ITEM;
       str += product.DESCRIPCION;
       str += product.STOCK;  
       str += product.PRECIO;  
      });

      docDefinition = {
        content: {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto', 'auto'],
            body: [
              [ 'Id Producto', 'Id Categoria ', 'Descripción', 'Stock', 'Precio'],
              [ str, str, str, str, str]
            ]
          }
        }          
      };  
  
       // pdfMake.createPdf(docDefinition).download('productos.pdf');
      pdfMake.createPdf(docDefinition).open();  
    }

    $scope.updateProduct = function(product) {
      console.log(product);
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'ln',
        resolve: {
          product: function() {
            return product;
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
            var url='#/estudiante/nuevo_producto';
            //categoryProduct.save($scope.item);
           // $location.path('/categoriaProducto');
            $window.location.href=url;
    }
    $scope.btnEditarClick = function (item) {
        var url='#/estudiante/editProducto/';
            console.log(item);
        $window.location.href = url+item.Id_estudiante;
        
    }
    $scope.updateProduct = function (item) {
          var url='#/estudiante/nuevo_producto';
          var idProducto=$stateParams.idProducto; 
            if (idProducto>0) {
              item.Id_estudiante=idProducto;
              Product.save(item);
              console.log(item);
            } 
            Product.get({}, function(response) {
              $scope.estudiantes = response;
            });
           // $location.path('/categoriaProducto');
          $window.location.href=url;

    }
  }
]);




