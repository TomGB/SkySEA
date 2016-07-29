angular.module('starter.services', [])
  
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
  
  obj.displayMessage = function (msg) {
    var myPopup = $ionicPopup.show({
      title: msg,
      buttons: [
        {
          text: 'OK'
        }
      ]
    })
  };

  return obj;
}]);