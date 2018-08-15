angular.module('shopApp', ['ngRoute'], function () { })
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "tpl/list.html",
        controller: "ProductsCtrl"
    })
    .when("/cart/", {
        templateUrl: "tpl/cart.html",
        controller: 'CartCtrl'
    })
})
.directive('cartTable', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'tpl/_cart_table.html',
  }
})
.directive('product', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: 'tpl/_product.html',
  }
})
.factory('products', ['$window', function($window){
  var cart = JSON.parse($window.localStorage.getItem('cart'));
  if(!cart) {
    cart = [];
  }
  return {
    list: [
      {id: 1, name: 'Sony Xperia Z', desc: 'Хороший телефон за свою цену', price: 200},
      {id: 2, name: 'LG L70 D325', desc: 'Бюджетный смартфон', price: 100},
      {id: 3, name: 'Xiaomi 4A', desc: 'Еще один бюджетный смартфон', price: 120}
    ],
    in_cart: cart
  }
}])
.controller('ProductsCtrl', ['$scope', '$window', 'products', function($scope, $window, products){

  $scope.products = products;

  $scope.addToCart = function(id) {
    if(products.in_cart.indexOf(id)<0) {
      products.in_cart.push(id);
      $window.localStorage.setItem('cart', JSON.stringify(products.in_cart));
    }
  }
}])
.controller('CartCtrl', ['$scope', '$window', 'products', function($scope, $window, products){


  $scope.fetchCartProducts = function() {
    $scope.cartProducts = [];
    angular.forEach(products.list, function(v) {
      if(products.in_cart.indexOf(v.id)>-1) {
        $scope.cartProducts.push(v);
      }
    });
  }

  $scope.fetchCartProducts();

  $scope.removeFromCart = function(id) {
    var index = products.in_cart.indexOf(id);
    if(index>-1) {
      products.in_cart.splice(index, 1);
      $window.localStorage.setItem('cart', JSON.stringify(products.in_cart));
    }
    $scope.fetchCartProducts();
  }

}]);

