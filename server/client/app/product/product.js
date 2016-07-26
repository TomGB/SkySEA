/**
 * Created by amu35 on 24/07/2016.
 */

(function() {
    angular.module('accessoriesStore')
        .controller('productCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
            $http.get('/api/cases/' + $routeParams.productId).then(function(res) {
                $scope.product = res.data;
            })
        }])
})();