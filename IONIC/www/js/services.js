angular.module('starter.services', [])

.factory("basketService", function(){
  return {
    addToBasket: function(item){
      var found = false;
      var index = 0;
      $rootScope.basketProducts.forEach(function(elem, ind, arr){
        if (elem.item.id == item.id){
          found = true;
          index = ind;
        }
      });

      if (!found){
        // Item is not already in basket
        $rootScope.basketProducts.push({
          item: item,
          quantity: 1
        });
      } else {
        // Item in basket already
        var productObj = $rootScope.basketProducts[index];
        productObj.quantity += 1;
      }
    }
  }
});