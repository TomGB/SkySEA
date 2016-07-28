angular.module('starter.controllers', [])

.run(function(basketService){
  basketService.basketProducts = [];
})

.controller('AppCtrl', ['$scope', 'basketService', 'AuthService', '$timeout',
  function($scope, basketService, AuthService, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.basketService = basketService;
  $scope.authService = AuthService;
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
      uiService.displayMessage("Error scanning QR code, please try again");
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
            basketService.checkout();
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.catalogue');
          }
        }]
      });
    }

  }

}])

.controller('LoginCtrl', ['$scope', 'AuthService', '$state', '$ionicHistory', 'uiService',
  function($scope, AuthService, $state, $ionicHistory, uiService){
    $scope.loginData = {};

    $scope.doLogin = function(email, password){
      AuthService.login(email, password).then(function(user){
        AuthService.user = user;
        $ionicHistory.nextViewOptions({disableBack: true});
        $state.go('app.checkout');
      },function(err){
        uiService.displayMessage("Sorry, those credentials don't match our records");
      })
    };

}])

.controller('RegisterCtrl', ['$scope', 'AuthService', '$state', '$ionicHistory', 'uiService',
  function($scope, AuthService, $state, $ionicHistory, uiService){
    $scope.errors = '';
    $scope.registerData = {};

    $scope.doRegister = function() {
      console.log($scope.registerData);
      if($scope.registerData.password == $scope.registerData.passwordConfirmation){
        AuthService.register(
          $scope.registerData.email,
          $scope.registerData.password,
          $scope.registerData.firstName,
          $scope.registerData.lastName,
          {
            number: $scope.registerData.number,
            street: $scope.registerData.street,
            posttown: $scope.registerData.posttown,
            postcode: $scope.registerData.postcode
          }
        ).then(function(data){
          $scope.registerData = {};
          $ionicHistory.nextViewOptions({disableBack: true});
          $state.go('app.checkout');
        }, function(){
          uiService.displayMessage("Registration unsuccessful, please try again");
        })

      }else{
        $scope.errors = 'Password mismatch';
      }
    };
}])

.controller('HelpCtrl', ['$scope', '$state', '$timeout', '$ionicModal', 'SocketService',
  function($scope, $state, $timeout, $ionicModal, SocketService){

    var r = new Random();
    var id = r.integer(10000,99999);
    $scope.id = id;

    $scope.contact = {};
    $scope.callInProgress = false;
    $scope.callEnded = false;

    SocketService.emit('login', {'id': id});

    $ionicModal.fromTemplateUrl('templates/callModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.callModal = modal;
    });

    function call(peer_id){
      var config = {
        isInitiator: true,
        stun: {
          host: 'stun:stun.l.google.com:19302'
        },
        turn: {
          host: 'turn:numb.viagenie.ca',
          username: 'webrtc@live.com',
          password: 'muazkh'
        },
        streams: {
          audio:true,
          video:true
        }
      };
      var session = new cordova.plugins.phonertc.Session(config);

      session.on('sendMessage', function(data){
        SocketService.emit('sendMessage', {
          'id': id,
          'peer_id': $scope.peer_id,
          'type': 'phonertc_handshake',
          'data': JSON.stringify(data)
        });
      });

      session.on('disconnect', function(){
        SocketService.emit('sendMessage', {
          'id': id,
          'peer_id': $scope.peer_id,
          'type': 'ignore'
        });
        $scope.callModal.hide();
      });

      session.call();
      $scope.contact = session;
    }

    $scope.startCall = function(){
      $scope.isCalling = true;
      $scope.callEnded = false;
      SocketService.emit('sendMessage', {
        'id': id,
        'peer_id': $scope.peer_id,
        'type': 'call'
      });
      call($scope.peer_id);
      $scope.callModal.show();
    };

    $scope.closeModal = function(){
      $scope.callModal.hide();
    };

    $scope.end = function(){
      $scope.contact.close();
      $scope.contact = {};

      SocketService.emit('sendMessage', {
        'id': id,
        'peer_id': $scope.peer_id,
        'type': end
      });

      $scope.callInProgress = false;
      $scope.callEnded = true;
      $scope.callModal.hide();
    };

    $scope.answer = function(){

      if($scope.callInProgress){
        return;
      }

      $scope.callInProgress = true;

      call(false, $scope.peer_id);

      setTimeout(function(){
        SocketService.emit('sendMessage', { 'id': id, 'peer_id': $scope.peer_id, 'type': 'answer' });
      }, 1500);
    };

    function onMessageReceive(message){

      switch(message.type){

        case 'answer':

          $scope.$apply(function(){
            $scope.callInProgress = true;
          });

          call(true, message.id);
          break;

        case 'ignore':
          $scope.callInProgress = false;
          $scope.callIgnored = true;
          $scope.callEnded = false;
          break;

        case 'phonertc_handshake':
          $scope.contact.receiveMessage(JSON.parse(message.data));
          break;

        case 'call':
          $scope.isCalling = false;
          $scope.callIgnored = false;
          $scope.callEnded = false;

          $scope.call_modal.show();

          $scope.peer_id = message.id;

          $scope.current_modal = 'call_modal';
          break;

        case 'end':
          $scope.callInProgress = false;
          $scope.callEnded = true;
          $scope.callIgnored = false;
          break;

      }
    }
    
    SocketService.on('messageReceived', onMessageReceive);
    
    $scope.$on('$destroy', function(){
      SocketService.removeListener('messageReceived', onMessageReceive);
    });
    
    
}]);
