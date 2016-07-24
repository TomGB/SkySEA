angular.module('starter.controllers', [])

.run(function($rootScope){
  $rootScope.basketProducts = [];
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


})

.controller('CatalogueCtrl', function($scope, $rootScope, $ionicPopup, $state, basketService) {
  $rootScope.products = [
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

  $scope.addToBasket = function(item) {
    basketService.confirmAddToBasket(item);
  }
})

.controller('ScanCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, $ionicPopup, basketService) {
  $scope.qrContent = [];

  presentPopup = function(item) {
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
            basketService.askGoToBasket(item);
          }
        }
      ]
    })
  }

  $scope.scan = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData){
      $rootScope.products.forEach(function(elem, ind, arr){
        if(elem.id == imageData.text){
          presentPopup(elem);
        }
      })

    }), function(error) {
      console.log("Error: " + error);
      alert("Error scanning QR code, please try again later");
    }
  }
})

.controller('BasketCtrl', function ($scope, $rootScope, $ionicPopup) {
  $scope.removeItem = function(product) {
    var myPopup = $ionicPopup.show({
      title: 'Removing ' + product.item.name + ' from the basket',
      subTitle: 'Are you sure?',
      scope: $scope,
      buttons: [
        {
          text: 'Cancel',
          type: 'button-stable'
        },
        {
          text: 'Remove',
          type: 'button-assertive',
          onTap: function(e){
            var index = $rootScope.basketProducts.indexOf(product);
            $rootScope.basketProducts.splice(index, 1);
          }
        }
      ]

    });
  };

  $scope.getTotal = function(){
    var total = 0;
    $rootScope.basketProducts.forEach(function(elem, ind, arr){
      total += elem.item.price;
    });
    return total;
  };
})

.factory("basketService", function($rootScope, $state, $ionicPopup){
  var obj = {};
  obj.addToBasket = function(item){
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
  };

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
            obj.addToBasket(item);
            obj.askGoToBasket(item);
          }
        }
      ]
    })
  };
  return obj;
})