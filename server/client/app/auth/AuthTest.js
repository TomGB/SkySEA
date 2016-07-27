/**
 * Created by jwi46 on 27/07/2016.
 */
describe('loginCtrl',function () {

    var $httpBackend, $rootScope, launchController, $routeParams;

    beforeEach(module('accessoriesStore'));

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        launchController = function () {
            $controller('loginCtrl', {$scope: $rootScope});
        }

    }));

    it('should return something',function () {
        $httpBackend.expectGET('/api/users/login').respond({});
        launchController();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });

});