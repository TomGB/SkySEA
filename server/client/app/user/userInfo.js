(function () {
    angular.module('accessoriesStore').controller('userInfoCtrl',['$scope', '$http', '$location', 'AuthService',function ($scope, $http, $location, AuthService) {
        AuthService.getUser().then(function(user){
            $scope.user = user;
        })
    }
    ]);
})();
