/**
 * Created by amu35 on 27/07/2016.
 */
angular.module('accessoriesStore')
.controller('checkoutCtrl',['$scope','basketService','AuthService',function ($scope,basketService,AuthService) {

    if(sessionStorage.getItem('token')){

        $scope.stages = ['Review Basket', 'Confirm Address and Pay'];
        $scope.stageIndex = 0;

        $scope.basket = basketService.basketProducts;
        $scope.totalPrice = basketService.getTotal();

        $scope.checkout = function(){basketService.checkout().then(function () {
                basketService.basketProducts = [];
                window.location = '/#/dashboard';
            },
            function () {
                $scope.error = "Error submitting order, please try again";
            })
        };

        AuthService.getUser().then(function (user) {
            $scope.user = user;
        });

        $scope.regex = "^[0-9]{2}/[0-9]{2}"

        $scope.nextPage = function () {
            $scope.stageIndex++;
        }
    }else{
        window.location= '/#/login';
    }
}]);