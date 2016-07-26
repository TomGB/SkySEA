/**
 * Created by amu35 on 24/07/2016.
 */

(function() {
    angular.module('accessoriesStore')
        .controller('productCtrl', ['$scope', '$http', '$routeParams','basketService', function($scope, $http, $routeParams,basketService) {
            $http.get('/api/cases/' + $routeParams.productId).then(function(res) {
                $scope.product = res.data;
            })

            $scope.addToBasket = basketService.addToBasket;

        }])
})();
