angular.module('starter.services', [])

// .factory("basketService", function(){
//   var obj = {};
//
//   obj.basketProducts = [];
//
//   obj.addToBasket = function(item){
//     var found = false;
//     var index = 0;
//     obj.basketProducts.forEach(function(elem, ind, arr){
//       if (elem.item.id == item.id){
//         found = true;
//         index = ind;
//       }
//     });
//
//     if (!found){
//       // Item is not already in basket
//       obj.basketProducts.push({
//         item: item,
//         quantity: 1
//       });
//     } else {
//       // Item in basket already
//       var productObj = obj.basketProducts[index];
//       productObj.quantity += 1;
//     }
//   };
//
//   obj.removeItem = function(product) {
//     var index = obj.basketProducts.indexOf(product);
//     obj.basketProducts.splice(index, 1);
//   };
//
//   obj.getTotal = function(){
//     var total = 0;
//     obj.basketProducts.forEach(function(elem, ind, arr){
//       total += elem.item.price * elem.quantity;
//     });
//     return total;
//   };
//   return obj;
// })

.factory('uiService', ['$state', '$ionicPopup', 'basketService',
  function($state, $ionicPopup, basketService){
  var obj = {};

  obj.askGoToBasket = function(item){
    var myPopup = $ionicPopup.show({
      title: item.name + " added to basket",
      buttons: [
        {
          text: 'Continue Shopping',
          type: 'button-stable'
        },
        {
          text: 'Go to basket',
          type: 'button-positive',
          onTap: function(e){
            $state.go('app.basket');
          }
        }
      ]
    });
  };

  obj.confirmAddToBasket = function(item){
    var myPopup = $ionicPopup.show({
      title: 'Add ' + item.name + ' to basket?',
      buttons: [
        {
          text: 'Cancel',
          type: 'button-assertive'
        },
        {
          text: 'Add',
          type: 'button-balanced',
          onTap: function(e){
            basketService.addToBasket(item);
            obj.askGoToBasket(item);
          }
        }
      ]
    })
  };

  return obj;
}])

.factory('productService', ['$http', function($http){
  var obj = {};

  obj.products = [];

  obj.getCases = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/api/cases'
    }).then(function (res) {
      return res.data.cases;
    }, function(res){
      console.log('Error: ' + res);
    });
  };

  return obj;
}]);
