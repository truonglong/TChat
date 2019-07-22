define(['app', 'directive/popups/roomEdit/roomEdit'], function (app) {
    app.controller("RoomListController",  ['tchatInfo', '$scope', '$http', '$rootScope','modalService', '$cookieStore',
        function (tchatInfo, $scope, $http, $rootScope, modalService, $cookieStore) {
            
            $scope.rooms = [];
            $scope.currentRoom = {
                name: 'TTT',
                id: 0,
            };
            var currentRoomIdCookie = $cookieStore.get('currentRoomId');
            
            $scope.getRoomList = function(){
                $http.get('room/list').success(function(data) {
                    $scope.rooms = data;

                    var isSwitchedToRoom = false;

                    for(var index in $scope.rooms){
                        var room = $scope.rooms[index];
                        room.newMessage = false;
                        room.isNotify = room.members[0].roommember.isNotify;
                        room.isVisible = room.members[0].roommember.isVisible;
                        room.isAdmin = room.members[0].roommember.isAdmin;

                        if(!isSwitchedToRoom && room.isVisible){
                            isSwitchedToRoom = true;
                            // $scope.switchRoom(room);
                            currentRoom = room;
                        }

                        if (currentRoomIdCookie && currentRoomIdCookie == room.id && room.isVisible) {
                            currentRoom = room;
                        }
                    }

                    tchatInfo.roomList = data;

                    if (currentRoom) {
                        $scope.switchRoom(currentRoom);
                        console.log('switch to current Room');
                    }
                    setTimeout(function(){
                        $('#roomListMenu').click();
                        $('#settingsMenu').click();
                    }, 300);

                    $rootScope.$broadcast('room:getRoomListFinished');
                });
            };
            
            $scope.switchRoom = function(room){
                tchatInfo.currentRoom = room;
                console.log('tchatInfo.currentRoom', tchatInfo.currentRoom);
                $cookieStore.put('currentRoomId', room.id);
                $scope.currentRoom.name = room.name;
                $scope.currentRoom.id = room.id;
                $scope.$emit('getMemberList', room.id);
                $('#attachment_room').val(room.id);

                $scope.$emit('room:switchRoom', room);
                $scope.updateNewMessage(room.id, false);
            };
            
            $scope.onRoomEdit = function(room){
                console.log('edit room ', room);
                modalService.showModal('js/app/directive/popups/roomEdit/roomEdit.html', 'RoomEditController', room );
            };
            
            $scope.updateNewMessage = function (id, value){
               
                for(var index in $scope.rooms){
                    if ($scope.rooms[index].id == id) {
                        $scope.rooms[index].newMessage = value;
                        break;
                    }
                }
            }

            var updateRoom = function(room) {
                if($scope.currentRoom.id == room.id) {
                    $scope.currentRoom = room;
                }

                for(var index in $scope.rooms){
                    if ($scope.rooms[index].id == room.id) {
                        $scope.rooms[index].name = room.name;
                        break;
                    }
                }

            }

            var addRoom = function(room) {
                if(room && room.user.id == tchatInfo.currentUser.id) {
                    room.isVisible = true;
                    room.isNotify = true;
                    room.isAdmin = true;
                    $scope.rooms.push(room);
                }
            }

            var deleteRoom = function(roomId) {
                for (i in $scope.rooms) {
                    if ($scope.rooms[i].id == roomId) {
                        $scope.rooms.splice(i, 1);
                        break;
                    }
                }
                if ($scope.currentRoom.id == roomId) {
                    for (j in $scope.rooms) {
                        if ($scope.rooms[j].isVisible) {
                            $scope.switchRoom($scope.rooms[j]);
                            break;
                        }
                    }
                }
            }

            var updateRoomMember = function(array) {
                var foundMe = false;
                for(i in array) {
                    if(array[i].memberId == tchatInfo.currentUser.id) {
                        foundMe = true;
                        var found;
                        for(j in $scope.rooms) {
                            if($scope.rooms[j].id == array[i].roomId) {
                                $scope.rooms[j].isAdmin = array[i].isAdmin;
                                found = true;
                                break;
                            }
                        }
                        if(!found) {
                            var room = array[i].room;
                            room.isVisible = array[i].isVisible;
                            room.isNotify = array[i].isNotify;
                            room.isAdmin = array[i].isAdmin;
                            $scope.rooms.push(array[i].room);
                        }
                        break;
                    }
                }
                // Remove member from a room
                if(!foundMe && array && array[0]) {
                    // remove room from room list
                    var roomId = array[0].roomId
                    var index = -1;
                    for(var j in $scope.rooms) {
                        if($scope.rooms[j].id == roomId) {
                            index = j;
                            break;
                        }
                    }
                    if(index >= 0) {
                        $scope.rooms.splice(index, 1);
                        if ($scope.currentRoom.id == roomId) { // Switch to first room
                            for (j in $scope.rooms) {
                                if ($scope.rooms[j].isVisible) {
                                    $scope.switchRoom($scope.rooms[j]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            $scope.getRoomList();
            
            $rootScope.$on('room:newmessage' , function(event, room){$scope.updateNewMessage(room.id, true);});
            $rootScope.$on('room:update' , function(event, data){ updateRoom(data); });
            $rootScope.$on('room:add' , function(event, data){ addRoom(data); });
            $rootScope.$on('room:delete' , function(event, data){ deleteRoom(data); });
            $rootScope.$on('roomMember:update' , function(event, data){ updateRoomMember(data); });
        }]);

    app.directive('roomList', function () {
        return {
            restrict: 'A',
            controller: 'RoomListController',
            templateUrl: 'js/app/directive/template/roomList.html'
        };
    });
});