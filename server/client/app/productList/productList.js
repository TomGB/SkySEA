/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  angular.module('accessoriesStore').controller('productListCtrl',['$scope', '$http',function ($scope,$http) {

    $scope.helloWorld = 'Hello World';
    $scope.cases = [
      {name:'starwars'},
      {name: 'frozen'},
      {name: 'silicon valley'}
    ]
  }
  ]);
})();
