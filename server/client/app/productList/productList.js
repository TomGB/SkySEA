/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  angular.module('accessoriesStore')
      .controller('productListCtrl',['$scope', '$http',function ($scope,$http) {

          $http.get('/api/cases').then(
              function (response) {
                $scope.cases = response.data.cases;
              },
              function (response) {
                  $scope.error = "could not load cases";
              }
          );
  }
  ]);
})();
