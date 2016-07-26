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
      .when('/helpChat', {
        templateUrl: 'app/helpChat/helpChat.html',
        controller: 'helpChatController'
      })
      .when('/techAssistant', {
        templateUrl: '/techAssistant/techAssistant.html',
        controller: 'techAssistantController'
      })
      .otherwise({redirectTo: '/productList'});

  }]);
})();
