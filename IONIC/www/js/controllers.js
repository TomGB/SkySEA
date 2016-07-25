angular.module('starter.controllers', [])

.run(function(basketService){
  basketService.basketProducts = [];
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, basketService) {

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

  $scope.basketService = basketService;

})

.controller('CatalogueCtrl', function($scope, $rootScope, basketService, uiService) {
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
    uiService.confirmAddToBasket(item);
  }
})

.controller('ScanCtrl', function ($scope, $cordovaBarcodeScanner, $ionicPopup, basketService, uiService) {
  $scope.scan = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData){
      $rootScope.products.forEach(function(elem, ind, arr){
        if(elem.id == imageData.text){
          basketService.confirmAddToBasket(elem);
        }
      })

    }), function(error) {
      console.log("Error: " + error);
      alert("Error scanning QR code, please try again later");
    }
  }
})

.controller('BasketCtrl', function ($scope, $ionicPopup, basketService) {
  $scope.removeItem = function(item) {
    var myPopup = $ionicPopup.show({
      title: 'Removing ' + item.item.name + ' from the basket',
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
            basketService.removeItem(item);
          }
        }
      ]

    });
  };

  $scope.getTotal = function(){
    return basketService.getTotal();
  };

  $scope.basketService = basketService;
})

.controller('CheckoutCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicHistory, basketService){
  $scope.options = ["Credit/Debit Card", "Product Order"];
  $scope.getTotal = function(){
    return basketService.getTotal();
  };

  $scope.card = {
    number: '',
    expiryDate: '',
    cvv: ''
  };
  $scope.po = {
    number: ''
  };
  $scope.submit = function(){
    basketService.basketProducts = [];
    var myPopup = $ionicPopup.show({
      title: 'Payment Successful',
      buttons: [{
        text: 'Return to Catalogue',
        type: 'button-assertive',
        onTap: function(e){
          $ionicHistory.nextViewOptions({disableBack: true});
          $state.go('app.catalogue');
        }
      }]
    })
  }

});
