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
  $scope.ordersToProcess = false;
  $scope.awaitingOrders = true;

  getOrders();
  $interval(getOrders, 5000);

  function getOrders() {
    $http.post('http://localhost:3000/api/warehouse/getWaitingOrders', data)
      .then(
        function(res) {
          $scope.orders = res.data.orders;
          $scope.ordersToProcess = true;
          $scope.awaitingOrders = false;
        }, function(err) {
          console.log(JSON.stringify(err));
        }
      );
  }

  $scope.setDelivered = function() {
    $scope.orders = [];
    $scope.awaitingOrders = true;
    $scope.ordersToProcess = false;
  }

}])

.controller('StatusCtrl', ['$scope', '$http', function($scope, $http){
  $scope.showActivate = true;
  $scope.showDeactivate = false;

  $scope.setActive = function() {
    var data = {};
    data.token = sessionStorage.getItem('token');
    data.status = true;

    $http.post('http://localhost:3000/api/warehouse/setActive', data)
      .then(function(res){
        $scope.showActivate = false;
        $scope.showDeactivate = true;
      });
  }

  $scope.setInactive = function() {
    var data = {};
    data.token = sessionStorage.getItem('token');
    data.status = false;

    $http.post('http://localhost:3000/api/warehouse/setActive', data)
      .then(function(res) {
        $scope.showActivate = true;
        $scope.showDeactivate = false;
      }, function(err) {
        console.log('Error: ' + err);
      });
  }
}])

.controller('LoginCtrl', ['$scope', '$ionicHistory', '$state', 'AuthService',
  function($scope, $ionicHistory, $state, AuthService){
  $scope.loginData = {};

  $scope.doLogin = function(email, password) {
    AuthService.workerLogin(email, password).then(function(user){
      AuthService.user = user;
      $ionicHistory.nextViewOptions({disableBack: true});
      $state.go('app.orders');
    },function(err){
      alert("Sorry, those credentials don't match our records");
    });
    $scope.loginData = {};
  };
}]);
