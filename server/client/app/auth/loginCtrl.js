(function () {
    angular.module('accessoriesStore').controller('loginCtrl',['$scope', '$http', '$location', 'AuthService', function ($scope, $http, $location, AuthService) {
        if(sessionStorage.getItem('token')){
            $location.url('/dashboard');
        }
        $scope.error = false;
        var config = {headers: {
            authorization: sessionStorage.getItem('token')
        }};

        $scope.loginSubmit = function(email, password){
            AuthService.login(email, password).then(function(user){
                AuthService.user = user;
                $location.url('/dashboard');
            },function(err){
                $scope.error = true;
            })
        };

    }
    ]);
})();
