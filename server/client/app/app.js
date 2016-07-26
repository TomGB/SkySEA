/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore',['ngRoute','monospaced.qrcode']);

  app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/productList', {
        templateUrl: 'app/productList/productList.html',
        controller: 'productListCtrl'
      })
      .when('/printView', {
        templateUrl: 'app/productList/printView.html',
        controller: 'productListCtrl'
      })
      .when('/login', {
        templateUrl: 'app/auth/login.html',
        contoller: 'loginCtrl'
      })
      .when('/productList/:productId', {
        templateUrl: 'app/product/product.html',
        controller: 'productCtrl'
      })
      .otherwise({redirectTo: '/productList'});

  }]);
})();
