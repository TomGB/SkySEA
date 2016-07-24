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

(function () {
  angular.module('accessoriesStore').controller('loginCtrl',['$scope', '$http',function ($scope,$http) {
    //Do something
  }
  ]);
})();

/**
 * Created by amu35 on 21/07/2016.
 */
(function () {
  angular.module('accessoriesStore').controller('productListCtrl',['$scope', '$http',function ($scope,$http) {

    $scope.helloWorld = 'Hello World';

    $http.get('http://localhost:3000/api/cases').then(function (response) {
        $scope.cases = response.data.cases;
    });
  }
  ]);
})();
