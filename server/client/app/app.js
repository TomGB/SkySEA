/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore',['ngRoute']);

  app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/productList', {
        templateUrl: 'app/productList/productList.html',
        controller: 'productListCtrl'
      })
      .when('/login', {
        templateUrl: 'app/auth/login',
        contoller: 'loginCtrl'
      })
      .otherwise({redirectTo: '/productList'});

  }]);
})();
