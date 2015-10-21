'use strict';
angular.module('seedApp')

.controller('productController', ['$scope', 'Product', 'categoryProduct','$location','$window','$routeParams','$stateParams', '$state',
  function($scope, Product, categoryProduct,$location,$window,$routeParams,$stateParams, $state) {

    $scope.products = [];
    Product.get({}, function(response) {
      console.log(response);
      $scope.products = response;
    });
    categoryProduct.get({}, function(response) {
      console.log(response);
      $scope.categorias = response;
    });

    $scope.item = {};
    
    $scope.saveProduct = function(item) {
      console.log(item);
      Product.save(item, function(response) {
      $scope.products.push(response);
      console.log(response);
      });
    }
     $scope.deleteProduct = function (product,idx) {
        console.log(product);
        product.$delete({ "ID_ITEM": product.ID_ITEM }, function (success) {
        console.log(success);
        $scope.products.splice(idx, 1);
        });
    }

    $scope.pdfMaker = function(product){
      var str = "" + product.ID_ITEM;
      str += product.ID_ITEM;
      str += product.ID_CATEGORIA_ITEM;
      str += product.DESCRIPCION;
      str += product.STOCK;
      str += product.PRECIO;
        var docDefinition = { content:{
        table: {
        headerRows: 1,
        widths: [ 'auto', 'auto', '*', 'auto','auto' ],
        body: [
          [ 'Id Producto', 'Id Categoria ', 'Descripción', 'Stock','Precio' ],
          [ product.ID_ITEM,product.ID_CATEGORIA_ITEM,product.DESCRIPCION,product.STOCK,product.PRECIO]
              ]
            }
        }           };  
       //pdfMake.createPdf(docDefinition).download('productos.pdf');
         pdfMake.createPdf(docDefinition).open();
    }

    $scope.pdfall = function() {
      var str = "";
      var docDefinition = "";
      var products = $scope.products;

      products.forEach(function(product) {
       str += product.ID_ITEM;
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
            var url='#/almacen/nuevo_producto';
            //categoryProduct.save($scope.item);
           // $location.path('/categoriaProducto');
            $window.location.href=url;
    }
    $scope.btnEditarClick = function (item) {
        var url='#/almacen/editProducto/';
            console.log(item);
        $window.location.href = url+item.ID_ITEM;
        
    }
    $scope.updateProduct = function (item) {
          var url='#/almacen/nuevo_producto';
          var idProducto=$stateParams.idProducto; 
            if (idProducto>0) {
              item.ID_ITEM=idProducto;
              Product.save(item);
              console.log(item);
            } 
            Product.get({}, function(response) {
              $scope.products = response;
            });
           // $location.path('/categoriaProducto');
          $window.location.href=url;

    }
  }
]);




