/**
 * Created by jwi46 on 26/07/2016.
 */
(function () {
    angular.module('accessoriesStore').controller('RegisterCtrl',['$scope', '$http', '$location', 'AuthService',function ($scope, $http, $location, AuthService) {
        if(sessionStorage.getItem('token')){
            $location.url('/dashboard');
        }
        $scope.getAddress = function(postcode){

            if(postcode.length > 6){
                $http.get('http://ws.postcoder.com/pcw/PCWBN-DTF76-6YQKT-N569Q/address/UK/' + postcode + '?identifier=AddressExample' ).then(function(response){
                    $scope.addresses = response.data;
                });
            }
        };

        $scope.register = function(email, password, firstName, lastName, address){
            AuthService.register(email, password, firstName, lastName, address);
        }
    }
    ]);
})();
