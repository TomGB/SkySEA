/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  var app = angular.module('accessoriesStore',[
    'ngRoute',
    'monospaced.qrcode',
    'shopModule',
    'angular-jwt'
  ]);
  app.directive('scrollToTop', function(){
    return {
        restrict: 'A',
        scope: {
            trigger: '=scrollToTop'
        },
        link: function postLink(scope, elem) {
            scope.$watch('trigger', function() {
                elem[0].scrollTop = 0;
            });
        }
    };
});
  app.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, current, previous, eventObj){
      if(eventObj.access == false){
        $location.url('/login');
      }
    });
  }]);
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
        controller: 'DashCtrl',
        resolve: {
           auth: ['$q', 'AuthService', function($q, AuthService){
           var user = AuthService.getUser();
           if(user){
             return $q.when(user)
              }else{
                return $q.reject({access: false});
              }
            }]
          }
        })
      .when('/basket',{
        templateUrl: 'app/basket/basket.html',
        controller: 'basketCtrl'
      })
      .when('/register', {
        templateUrl: 'app/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/helpchat', {
        templateUrl: '/app/helpchat/helpchat.html',
        controller: 'helpchatCtrl'
      })
      .when('/techAssistant', {
        templateUrl: '/app/techAssistant/techAssistant.html',
        controller: 'techAssistantCtrl'
      })
      .otherwise({redirectTo: '/productList'});
  }]);
})();
