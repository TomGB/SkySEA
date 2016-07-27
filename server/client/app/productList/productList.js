/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore');
  app.controller('productListCtrl',['$scope', '$http','basketService',function ($scope,$http,basketService) {


      $scope.phoneModels  = [];
      $scope.showNames = [];

      $http.get('/api/cases').then(
          function (response) {
              $scope.cases = response.data.cases;

              angular.forEach($scope.cases,function (phoneCase) {
                  if($scope.phoneModels.indexOf(phoneCase.PhoneType) < 0 && phoneCase.PhoneType){
                      $scope.phoneModels.push(phoneCase.PhoneType);
                  }
                  if($scope.showNames.indexOf(phoneCase.ShowName)<0 && phoneCase.ShowName){
                      $scope.showNames.push(phoneCase.ShowName);
                  }
              })
          },
          function (response) {
              $scope.error = "could not load cases";
          }
      );

      $scope.addToBasket = basketService.addToBasket;

  }]);
})();
