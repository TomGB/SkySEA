(function(){
    angular.module('accessoriesStore').service('AuthService', ['$http', '$q', '$location', function($http, $q, $location){
        var error = false;
        var user = {};
        return {
            login: function(email, password){
                var deferred = $q.defer();
                $http.post('/api/users/login', {
                    email: email,
                    password: password
                }).then(function(response) {
                    user = response.data.user;
                    sessionStorage.setItem('token', response.data.token);
                    deferred.resolve(user);
                }, function(res){
                    deferred.reject(error);
                });
                return deferred.promise;
            },
            getUser: function(){
                var deferred = $q.defer();
                $http.get('/api/users/login', {
                    headers: {
                        authorization: sessionStorage.getItem('token')
                    }
                }).then(function(response) {
                    user = response.data.user;
                    deferred.resolve(user);
                }, function(res){
                    if(res.status == 401){
                        $location.url('/login')
                    }
                });
                return deferred.promise;
            }
    }
    }]);
})();
