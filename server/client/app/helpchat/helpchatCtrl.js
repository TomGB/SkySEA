(function() {
  angular.module('accessoriesStore').controller('helpchatCtrl', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
    navigator.getUserMedia = ( navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia);

    var peer;
    var connection;
    var assistantCall;
    $scope.messages = [];
    $scope.requested = false;
    $scope.audio = false;
    $scope.video = false;
    $scope.hideRemote = true;

    $scope.send = function(msg) {
      var message = { sender: $scope.firstName, msg: msg };
      $scope.messages.push(message);
      connection.send(message);
      $scope.msg = '';
    }

    $scope.requestSupport = function(name, audio, video) {
      peer = new Peer({host: 'localhost', port: 9000, path: '/'});
      $scope.requested = true;
      peer.on('open', function(id) {
          $http.post('/api/helpchat/clientid', {
            name: name,
            clientid: id,
            audio: audio,
            video: video
          }).then(function(response) {

          }, function(error) {

          })
      });

      $scope.end = function() {
        if(assistantCall) {
          setElementProp('#remote-video', 'src', null);
          $scope.hideRemote = true;
          assistantCall.close();
        }
      }

      peer.on('connection', function(conn) {
        connection = conn;
        connection.on('open', function() {
          connection.on('data', function(data) {
            console.log(data);
            $scope.messages.push(data);
            $scope.$apply();
          });
        });
      });

      peer.on('call', function(call) {
        assistantCall = call;
        navigator.getUserMedia({audio: $scope.audio, video: $scope.video},
          function(stream) {
            setElementProp('#local-video', 'src', URL.createObjectURL(stream));
            window.localStream = stream;
            assistantCall.answer(window.localStream);
            $scope.hideRemote = false;
            $scope.requested = false;
            $scope.$apply();
          }, function(error) {
            console.log(error);
          });
        assistantCall.on('stream', function(stream) {
          setElementProp('#remote-video', 'src', URL.createObjectURL(stream));
        });
        assistantCall.on('close', function() {
          $scope.hideRemote = true;
          setElementProp('#remote-video', 'src', null);
          window.localStream = null;
          setElementProp('#local-video', 'src', URL.createObjectURL(stream));
        });
      });

      function setElementProp(querySelector, attr, value) {
        var el = angular.element(document.querySelector(querySelector));
        el.attr(attr, value);
      }

    }
  }]);
})();
