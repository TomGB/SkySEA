/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  angular.module('accessoriesStore').controller('productListCtrl',['$scope', '$http',function ($scope,$http) {

    $scope.helloWorld = 'Hello World';
    
    $http.get('http://localhost:3000/api/cases').then(function (response) {
        $scope.cases = response.data.cases;
    });
  }
  ]);
})();
