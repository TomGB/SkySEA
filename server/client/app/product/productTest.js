/**
 * Created by amu35 on 24/07/2016.
 */
describe('productCtrl',function () {

    var $httpBackend, $rootScope, launchController, $routeParams;

    beforeEach(module('accessoriesStore'));

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(inject(function(_$routeParams_){
        $routeParams = _$routeParams_;
        $routeParams.productId = 4;
    }));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        launchController = function () {
            $controller('productCtrl', {$scope: $rootScope});
        }

    }));
    
    it('should request the product for the passed id',function () {
        $httpBackend.expectGET('/api/cases/4').respond({});
        launchController();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });

});