(function(){
  angular.module('accessoriesStore')
    .controller('navCtrl',['$scope','basketService', 'AuthService', '$location','$rootScope', function($scope,basketService, AuthService, $location,$rootScope){
        if(sessionStorage.getItem('token')) {
            $rootScope.signedIn = true;
            AuthService.getUser().then(function (user) {
                $scope.user = user;
            });
            
            
            $scope.logout = function(){
                $rootScope.signedIn = false;
                sessionStorage.removeItem('token');
                $location.url('/');
            };
        }
      $scope.getTotalItems = basketService.getTotalItems;
  }])
})();
