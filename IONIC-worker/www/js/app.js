// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'shopModule'])

.run(function($ionicPlatform, $rootScope, $state, AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      console.log('s: ' + toState.authRequired);
      console.log('a: ' + AuthService.isLoggedIn());
      if(toState.authRequired && !AuthService.isLoggedIn()){
        $state.go('app.login');
        event.preventDefault();
      }
    })
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.orders', {
    url: '/orders',
    authRequired: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    authRequired: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
