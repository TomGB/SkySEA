(function(){
  angular.module('starter.services', ['shopModule'])
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
      .factory('productService', [function(){
        var obj = {};

        obj.products = [
          {
            id: 1,
            name: 'iPhone 6 - Game of Thrones',
            price: 4.99,
            imgUrl: 'img/phonecases/IPhone6-GOT.jpg'
          },
          {
            id: 2,
            name: 'HTC 10 - Game of Thrones',
            price: 4.99,
            imgUrl: 'img/phonecases/HTC10-GOT.jpg'
          },
          {
            id: 3,
            name: 'LG G5 - Game of Thrones',
            price: 4.99,
            imgUrl: 'img/phonecases/LGG5-GOT.jpg'
          },
          {
            id: 4,
            name: 'Nexus 6 - Game of Thrones',
            price: 3.99,
            imgUrl: 'img/phonecases/Nexus6-GOT.jpg'
          }
        ];

        return obj;
      }]);
})();