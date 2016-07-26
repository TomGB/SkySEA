(function(){
  angular.module('accessoriesStore')
  .controller('basketCtrl',['$scope','basketService',function($scope,basketService){
    $scope.basket = basketService.basketProducts;
    
    $scope.removeIfZero = function (product) {
      if(product.quantity == 0){
        $scope.removeItem(product)
      }
    };

    $scope.removeItem = function(product){

      var r = window.confirm('Are you sure you want to remove '+product.item.name + ' from your basket?');
      if(r)
        basketService.removeItem(product);
    }
    
  }])
})();
