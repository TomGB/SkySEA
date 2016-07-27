/**
 * Created by jwi46 on 26/07/2016.
 */
(function () {
    angular.module('accessoriesStore').controller('DashCtrl',['$scope', '$http', '$location', 'AuthService' ,function ($scope, $http, $location, AuthService) {
        $scope.signedIn = sessionStorage.getItem('token') ? true:false;
        if($scope.signedIn){
            AuthService.getUser().then(function(user){
                $scope.user = user;
            });

            $scope.logout = function(){
                sessionStorage.removeItem('token');
                $location.url('/');
            };
        }
    }
    ]);
})();