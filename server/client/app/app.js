/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore',['ngRoute','shopModule']);

  app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/productList', {
        templateUrl: 'app/productList/productList.html',
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
      .when('/basket',{
        templateUrl: 'app/basket/basket.html',
        controller: 'basketCtrl'
      })
      .otherwise({redirectTo: '/productList'});
  }]);
})();
