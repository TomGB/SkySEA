/**
 * Created by jwi46 on 26/07/2016.
 */
(function () {
    angular.module('accessoriesStore').controller('RegisterCtrl',['$scope', '$http', '$location', '$window',function ($scope, $http, $location, $window) {
        $scope.getAddress = function(postcode){
            if(postcode.length > 6){
                $http.get('http://ws.postcoder.com/pcw/PCWXG-TXRP7-BX2PM-S54S2/address/UK/' + postcode + '?identifier=AddressExample' ).then(function(response){
                    $scope.addresses = response.data;
                    console.log(response.data);
                    console.log("Response:" + response.data);
                });
            }
        }
        $scope.register = function(email, password){
            console.log(email, password);
        }
    }
    ]);
})();
