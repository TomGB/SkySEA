/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore');
  app.controller('productListCtrl',['$scope', '$http','basketService',function ($scope,$http,basketService) {


      $http.get('/api/cases').then(
          function (response) {
            $scope.cases = response.data.cases;
          },
          function (response) {
              $scope.error = "could not load cases";
          }
      );

      $scope.addToBasket = basketService.addToBasket;

  }]);
})();
