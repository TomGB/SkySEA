angular.module('starter.controllers', [])

.run(function(basketService){
  basketService.basketProducts = [];
})

.controller('AppCtrl', ['$scope', 'basketService',
  function($scope, basketService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.basketService = basketService;

}])

.controller('CatalogueCtrl', ['$scope', 'uiService', 'productService', '$ionicPopup',
  function($scope, uiService, productService, $ionicPopup) {

  $scope.phoneModels = [];

  $scope.getCases = function(){
    productService.getCases().then(function (data) {
      productService.products = data;

      angular.forEach(productService.products,function (phoneCase) {
        if($scope.phoneModels.indexOf(phoneCase.PhoneType) < 0 && phoneCase.PhoneType){
          $scope.phoneModels.push(phoneCase.PhoneType);
        }
      });
    }, function(error){
      console.log("Error: " + error);
    })
  };

  $scope.addToBasket = function(item) {
    uiService.confirmAddToBasket(item);
  };

  $scope.productService = productService;
}])

.controller('ScanCtrl', ['$scope', '$cordovaBarcodeScanner' ,'$ionicPopup' , 'uiService', 'productService',
  function ($scope, $cordovaBarcodeScanner, $ionicPopup, uiService, productService) {
  $scope.scan = function(){
    $cordovaBarcodeScanner.scan().then(function(imageData){
      productService.products.forEach(function(elem, ind, arr){
        if(elem.id == imageData.text){
          if (elem.availableStock)
            uiService.confirmAddToBasket(elem);
          else
           uiService.displayMessage('Sorry, ' + elem.name + ' is currently out of stock');
        }
      })

    }), function(error) {
      console.log("Error: " + error);
      uiService.displayMessage("Error scanning QR code, please try again later");
    }
  }
}])

.controller('BasketCtrl', ['$scope', '$ionicPopup', 'basketService', 'AuthService',
  function ($scope, $ionicPopup, basketService, AuthService) {
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
  $scope.authService = AuthService;
}])

.controller('CheckoutCtrl', ['$scope', '$ionicPopup', '$state', '$ionicHistory', 'basketService',
  function($scope, $ionicPopup, $state, $ionicHistory, basketService){

  $scope.options = ["Credit/Debit Card", "Product Order"];
  $scope.selectedPayment = $scope.options[0];
  $scope.getTotal = function(){
    return basketService.getTotal();
  };

  $scope.card = {};
  $scope.po = {};

  $scope.submit = function(isValid){

    if (isValid){
      basketService.basketProducts = [];
      var myPopup = $ionicPopup.show({
        title: 'Payment Successful',
        buttons: [{
          text: 'Return to Catalogue',
          type: 'button-assertive',
          onTap: function(e){
            $scope.card = {};
            $scope.po = {};
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.catalogue');
          }
        }]
      });
    }

  }

}])

.controller('LoginController', ['$scope', 'AuthService',
  function($scope, AuthService){
    $scope.loginData = {};

    $scope.doLogin = function(email, password){
      AuthService.login(email, password).then(function(user){
        AuthService.user = user;
        $location.url('/dashboard');
      },function(err){
        $scope.error = true;
      })
    };
}])

.controller('SignupController', ['$scope', 'AuthService',
  function($scope, AuthService){
    $scope.signupData = {};

    $scope.doSignup = function() {
      console.log('Doing login', $scope.signupData);
    };
}]);
