(function() {
  angular.module('accessoriesStore').controller('techAssistantCtrl', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
    navigator.getUserMedia = ( navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia);


    var peer = new Peer({host: 'localhost', port: 9000, path: '/'});
    var conn;
    var call;
    $scope.customer = {};
    $scope.messages = [];

    AuthService.getUser().then(function(user) {
      $scope.user = user;
    }, function(error) {
      console.log(error);
    });

    $scope.end = function() {
      if(call) {
        setElementProp('#remote-video', 'src', null);
        $scope.hideRemote = true;
        call.close();
      }
    }

    $scope.send = function(msg) {
      var message = { sender: $scope.user.firstName, msg: msg };
      $scope.messages.push(message);
      conn.send(message);
      $scope.msg = '';
    }

    $scope.call = function() {
      $http.get('/api/techAssistant/nextCustomer', {
          headers: {
              authorization: sessionStorage.getItem('token')
          }
      }).then(function(response) {
        console.log(response);
        var customer = response.data.customer;
        $scope.customer = customer;

        conn = peer.connect(customer.peerjsId);
        conn.on('open', function(){

        });
        conn.on('data', function(data) {
          console.log(data);
          $scope.messages.push(data);
          $scope.$apply();
        });
        call = peer.call(customer.peerjsId, window.localStream);
        $scope.hideRemote = false;
        call.on('stream', function(stream) {
          setElementProp('#remote-video', 'src', URL.createObjectURL(stream));
        });
      }, function(error) {
        console.log(error);
      });
    }

    navigator.getUserMedia({ audio: true, video: true },
      function(stream) {
        setElementProp('#local-video', 'src', URL.createObjectURL(stream));
        window.localStream = stream;
      }, function(error) {

      });

    function setElementProp(querySelector, attr, value) {
      var el = angular.element(document.querySelector(querySelector));
      el.attr(attr, value);
    }

    function getElement(querySelector) {
      return angular.element(document.querySelectory(querySelector));
    }

  }]);
})();
