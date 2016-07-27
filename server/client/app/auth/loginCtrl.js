(function () {
    angular.module('accessoriesStore').controller('loginCtrl',['$scope', '$http', '$location', 'AuthService', '$rootScope', function ($scope, $http, $location, AuthService, $rootScope) {
        if(sessionStorage.getItem('token')){
            $location.url('/dashboard');
        }
        $scope.error = false;
        var config = {headers: {
            authorization: sessionStorage.getItem('token')
        }};

        $scope.loginSubmit = function(email, password){
            AuthService.login(email, password).then(function(user){
                 console.log($rootScope.signedIn);
                AuthService.user = user;
                $location.url('/dashboard');
            },function(err){
                $scope.error = true;
            })
        };

    }
    ]);
})();
