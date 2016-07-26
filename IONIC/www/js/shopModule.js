/**
 * Created by amu35 on 25/07/2016.
 */
(function(){
var app = angular.module('shopModule',[])

app.service("basketService", function(){
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
    return obj;
});

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

    return obj;
}]);
})();
