/**
 * Created by amu35 on 21/07/2016.
 */
describe('productListCtrl',function () {

  var $httpBackend,$rootScope, launchController;

  beforeEach(module('accessoriesStore'));

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    launchController =   function () {
      $controller('productListCtrl', { $scope: $rootScope });
    }
  }));


  it('should be populated from the http response', function() {
    $httpBackend.expectGET('/api/cases').respond({cases:[{name:'testCase'}]});
    launchController();
    $httpBackend.flush();
    expect($rootScope.cases[0].name).toEqual('testCase');
  });

  it('should return an error when the request is invalid', function () {
    $httpBackend.expectGET('/api/cases').respond(404,{});
    launchController();
    $httpBackend.flush();
    expect($rootScope.error).toEqual("could not load cases");
  })
  
});
