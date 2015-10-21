'use strict';

angular.module('seedApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, estudiante) {

  $scope.estudiante = estudiante;
  $scope.save = function () {
    //$modalInstance.close($scope.selected.item);
    $scope.estudiante.$update({'Id_Estudiante':$scope.estudiante.Id_Estudiante}, function(response){
      
    });
    $modalInstance.dismiss('cancel');    
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});