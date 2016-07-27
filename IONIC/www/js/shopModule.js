/**
 * Created by amu35 on 25/07/2016.
 */
(function(){
var app = angular.module('shopModule',[]);

app.service("basketService", ['$http', function($http){
    var obj = {};

    obj.basketProducts = [];

    obj.addToBasket = function(item){
        var found = false;
        var index = 0;
        obj.basketProducts.forEach(function(elem, ind, arr){
            if (elem.item.id == item.id){
                found = true;
                index = ind;
            }
        });

        if (!found){
            // Item is not already in basket
            obj.basketProducts.push({
                item: item,
                quantity: 1
            });
        } else {
            // Item in basket already
            var productObj = obj.basketProducts[index];
            productObj.quantity += 1;
        }
    };

    obj.removeItem = function(product) {
        var index = obj.basketProducts.indexOf(product);
        obj.basketProducts.splice(index, 1);
    };

    obj.getTotal = function(){
        var total = 0;
        obj.basketProducts.forEach(function(elem, ind, arr){
            total += elem.item.price * elem.quantity;
        });
        return total;
    };

    obj.getTotalItems = function(){
        var total = 0;
        obj.basketProducts.forEach(function(elem, ind, arr){
            total += elem.quantity;
        });
        return total;
    };
    obj.checkout = function(){
      var data = {
        products:obj.basketProducts,
        token: sessionStorage.getItem('token')
      };

      return $http.post('/api/warehouse/checkout', data)
        .then(function(res){
          console.log(res);
        });
    };
    return obj;
}]);

app.factory('productService', ['$http', function($http){
    var obj = {};

    obj.products = [];

    obj.getCases = function(){
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/cases'
        }).then(function (res) {
            return res.data.cases;
        }, function(res){
            console.log('Error: ' + res);
        });
    };

    obj.getStockMessage = function(product){
      if (product.availableStock >= 10)
        return "In Stock";
      else if (product.availableStock < 10 && product.availableStock > 0)
        return product.availableStock + " Left";
      else
        return "Out of Stock";
    };

    return obj;
}]);
app.service('AuthService', ['$http', '$q', '$location', function($http, $q, $location){
    var error = false;
    var user = {};

    return {
      login: function (email, password) {
        var deferred = $q.defer();
        $http.post('http://localhost:3000/api/users/login', {
          email: email,
          password: password
        }).then(function (response) {
          user = response.data.user;
          sessionStorage.setItem('token', response.data.token);
          deferred.resolve(user);
        }, function (res) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      getUser: function () {
        var deferred = $q.defer();
        $http.get('http://localhost:3000/api/users/login', {
          headers: {
            authorization: sessionStorage.getItem('token')
          }
        }).then(function (response) {
          user = response.data.user;
          deferred.resolve(user);
        }, function (res) {
          if (res.status == 401) {
            $location.url('/login')
          }
        });
        return deferred.promise;
      },
      register: function (email, password, firstName, lastName, address) {
        if (address.number == undefined) {
          address.number = address.premise
        }
        console.log(address);

        var deferred = $q.defer();
        $http.post('http://localhost:3000/api/users/register', {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          address1: address.number,
          address2: address.street,
          address3: address.posttown,
          postcode: address.postcode
        }).then(function (response) {
          user = response.data.user;
          sessionStorage.setItem('token', response.data.token);
          deferred.resolve(user);
        }, function (res) {
          deferred.reject(res);
        });
        return deferred.promise;
      },
      isLoggedIn: function () {
        return !!sessionStorage.getItem('token');
      },
      logout: function () {
        sessionStorage.setItem('token', '');
        user = {};
      }
    }
}]);
})();
