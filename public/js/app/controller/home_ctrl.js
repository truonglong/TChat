var dependencies = [
    'app',
    'directive/navMenu',
    'directive/leftMenu',
    'directive/roomHeader',
    'directive/messageList',
    'directive/messageInput',
    'directive/rightMenu',
    'directive/directChat'
];

define(dependencies, function (app) {

    app.controller('HomeController',  ['tchatInfo', '$scope', '$http', 'socket', '$uibModal',  function (tchatInfo, $scope, $http, socket, $uibModal) {
        var getUser = function(){
            $http.get('member').success(function(user){
                tchatInfo.currentUser = user;
                $('#attachment_member').val(user.id);
                $scope.$emit('currentUser:update', user);
            });
        };
        var getNotication = function() {
            $http.get('notification').success(function(notification){
                tchatInfo.notification = notification;
                $scope.$emit('notification:update', notification);
            });
        }
        getUser();
        getNotication();

        socket.on('tchatsocket', function(tchatsocket){
            console.log('WS MESSAGE', tchatsocket);
            switch(tchatsocket.type){
                case 'insertMessage':
                    $scope.$emit('message:insert', tchatsocket.data);
                    break;
                case 'memberUpdate':
                    $scope.$emit('member:update', tchatsocket.data);
                    break;

                case 'roomUpdate':
                    console.log('RoomUpdate');
                    console.log(tchatsocket.data)
                    $scope.$emit('room:update', tchatsocket.data);
                    break;

                case 'roomMemberUpdate':
                    console.log('roomMemberUpdate');
                    console.log(tchatsocket.data)
                    $scope.$emit('roomMember:update', tchatsocket.data);
                    break;
                    

                case 'roomAdd':
                    $scope.$emit('room:add', tchatsocket.data);
                    break;
                case 'roomDelete':
                    $scope.$emit('room:delete', tchatsocket.data);
                    break;
                
                case 'editMessage':
                case 'deleteMessage':
                    $scope.$emit('message:update', tchatsocket.data);
                    break;
                case 'insertChat':
                    $scope.$emit('chat:insert', tchatsocket.data);
                    break;
                case 'notificationUpdate':
                    $scope.$emit('notification:update', tchatsocket.data);
                    break;
                default:
                    break;
            }
            
        });
    }]);

    app.directive('onFileChange', function() {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var onChangeHandler = scope.$eval(attrs.onFileChange);
          element.bind('change', onChangeHandler);
        }
      };
    });

    app.directive( 'elemReady', function( $parse, $timeout ) {
       return {
           restrict: 'A',
           link: function( $scope, elem, attrs ) {
                $timeout(function() {
                    elem.ready(function(){
                        if(!$scope.$$phase) {
                            $scope.$apply(function(){
                                var func = $parse(attrs.elemReady);
                                func($scope);
                            });
                        }
                      })
                })
           }
        }
    })
});
