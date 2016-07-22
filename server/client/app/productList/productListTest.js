/**
 * Created by amu35 on 21/07/2016.
 */
describe('productListCtrl',function () {
  beforeEach(module('accessoriesStore'));

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  describe('$scope.helloWorld', function() {
    it('equal hello world', function() {
      var $scope = {};
      var controller = $controller('productListCtrl', { $scope: $scope });

      expect($scope.helloWorld).toEqual('Hello World');
    });
  });
});
