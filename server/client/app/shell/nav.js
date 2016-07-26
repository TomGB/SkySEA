(function(){
  angular.module('accessoriesStore')
    .controller('navCtrl',['$scope','basketService',function($scope,basketService){
      $scope.getTotalItems = basketService.getTotalItems;
  }])
})();
