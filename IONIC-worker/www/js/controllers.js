angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', 'AuthService', '$ionicHistory', '$state',
  function($scope, AuthService, $ionicHistory, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.authService = AuthService;

  $scope.logout = function(){
    AuthService.logout();
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.login');
  }

}])

.controller('OrdersCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

  var data = { token: '1' };

  $scope.orders = [];

  $http.post('http://localhost:3000/api/warehouse/getWaitingOrders', data)
    .then(function(res) {
      $scope.orders = res.data.orders;
      console.log(res.data.orders);
    }, function(err) { console.log(JSON.stringify(err));
  });


/*

  $scope.orders = [
    {
      id: 1,
      products: [
          { id: 1, qty: 3, name: 'Frozen HTC10', imageurl: 'frozen.jpg' },
          { id: 7, qty: 1, name: 'Sillicon Valley iPhone', imageurl: 'sillicon.jpg' }
      ],
      address: {
        address1: '8 Fail Rd',
        address2: 'Failsworth',
        address3: 'Oldham',
        postcode: 'OL4 5JT'
      }
    },
    {
      id: 2,
      products: [
          { id: 10, qty: 1, name: 'Frozen iPhone', imageurl: 'frozen.jpg' }
      ],
      address: {
        address1: '146 Greentown Ln',
        address2: 'Mabletown',
        address3: 'County Durham',
        postcode: 'DH2 6RT'
      }
    },
    {
      id: 3,
      products: [
        { id: 2, qty: 1, name: 'Star Wars HTC10', imageurl: 'starwars.jpg' },
        { id: 4, qty: 1, name: 'Avengers HTC10', imageurl: 'avengers.jpg' },
        { id: 9, qty: 1, name: 'Game of Thrones iPhone', imageurl: 'GOT.jpg' }
      ],
      address: {
        address1: 'Sky3',
        address2: 'Clarence Dock',
        address3: 'Leeds',
        postcode: 'L12 3RT'
      }
    },
    {
      id: 4,
      products: [
          { id: 3, qty: 1, name: 'Sillicon Valley HTC10', imageurl: 'sillicon.jpg' },
          { id: 4, qty: 2, name: 'Avengers HTC10', imageurl: 'avengers.jpg'}
      ],
      address: {
        firstname: '',
        lastname: '',
        address1: 'C409, MSV North',
        address2: 'Oxford Road',
        address3: 'Manchester',
        postcode: 'M1 5SX'
      }
    }
  ];*/
}])

.controller('LoginCtrl', ['$scope', '$ionicHistory', '$state', 'AuthService',
  function($scope, $ionicHistory, $state, AuthService){
  $scope.loginData = {};

  $scope.doLogin = function(email, password) {
    AuthService.login(email, password).then(function(user){
      AuthService.user = user;
      $ionicHistory.nextViewOptions({disableBack: true});
      $state.go('app.orders');
    },function(err){
      alert("Sorry, those credentials don't match our records");
    });
    $scope.loginData = {};
  };
}]);
