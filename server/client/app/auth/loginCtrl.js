(function () {
    angular.module('accessoriesStore').controller('loginCtrl',['$scope', '$http', '$location', '$window',function ($scope, $http, $location, $window) {
        $scope.error = false;
        var config = {headers: {
            authorization: sessionStorage.getItem('token')
        }};
        $http.get('/api/users/dashboard', config).success(function(res, next){
            if(res.access == false){
                return $location.url('/login')
            }else{
                $scope.user = res.user;
            }
        });

        $http.get('/api/users/login', config).success(function(res, next){
            if(res.access == false){
                return $location.url('/login');
            }else{
                return $location.url('/dashboard');
            }
        });

        $scope.loginSubmit = function(email, password){
            $http.post('/api/users/login', {
                email: email,
                password: password
            }).then(function(response) {
                $scope.user = response.data.user;
                sessionStorage.setItem('token', response.data.token);
                $location.url('/dashboard');
            }, function(res){
                console.log(res);
            });
        };

        $scope.logout = function(){
            sessionStorage.removeItem('token');
            $location.url('/');
        }


    }
    ]);
})();
