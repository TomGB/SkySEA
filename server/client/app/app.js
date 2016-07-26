/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore',[
    'ngRoute',
    'monospaced.qrcode',
    'shopModule'
  ]);

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
        controller: 'loginCtrl'
      })
      .when('/productList/:productId', {
        templateUrl: 'app/product/product.html',
        controller: 'productCtrl'
      })
        .when('/dashboard', {
          templateUrl: 'app/auth/dash.html',
          controller: 'loginCtrl'
        })
      .when('/basket',{
        templateUrl: 'app/basket/basket.html',
        controller: 'basketCtrl'
      })
      .otherwise({redirectTo: '/productList'});
  }]);
})();
