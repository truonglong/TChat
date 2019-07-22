define(['app'], function (app) {
    app.controller("RoomEditController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance', 'data',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, room) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.searchedMemberList = [];
            $scope.roomMemberList = [];

            if(tchatInfo.currentRoom) {
                $scope.room = {
                    id: room.id,
                    name: room.name,
                    isAdmin: false
                }
            }

            // load room member list
            $http.get('api/member/list/' + room.id).success(function(data) {
                console.log('memberList: ', data);
                if(data) $scope.roomMemberList = data;
            });

            // load all member (TODO: should improve by search function)
            $http.get('member/listall').success(function(data) {
                if(data){
                    data.forEach(function(member){
                        $scope.searchedMemberList.push(member);
                    });
                }
            });



            $scope.addMember = function (member){
                var found;
                for(i in $scope.roomMemberList) {
                    var m = $scope.roomMemberList[i];
                    if(m.user.id == member.id) {
                        found = true;
                    }
                }
                if(!found){
                    $scope.roomMemberList.push({
                        isAdmin: false,
                        isNotify: true,
                        isVisible: true,
                        roomId: room.id,
                        memberId: member.id,
                        user: member
                    });
                    setTimeout(function() {
                        var scroller = document.getElementById("selectedMembersList");
                        scroller.scrollTop = scroller.scrollHeight;
                    }, 0, false);
                }
            }

            $scope.removeMember = function (member){
                for(i in $scope.roomMemberList) {
                    var m = $scope.roomMemberList[i];
                    if(m.user.id == member.user.id) {
                        $scope.roomMemberList.splice(i, 1);
                    }
                }
            }

            $scope.setAdmin = function (member){
                member.isAdmin = !member.isAdmin;
            }

             $scope.updateRoom = function(){
                if($scope.room.name == ''){
                    return;
                }

                if ($scope.roomMemberList.length == 0) { // delete room
                    $http.post('room/delete/' + $scope.room.id, { timeout: 30000}).then(function(){
                            console.log('Delete room', $scope.room.id);
                        }, function(error){
                            console.error('Update Error', error);
                    });
                } else { // Update room
                    var roomData = {
                        id: $scope.room.id,
                        name: $scope.room.name,
                        members: $scope.roomMemberList
                    };

                    $http.post('room', roomData, { timeout: 30000}).then(function(){
                            for(var i in tchatInfo.roomList){
                                var room = tchatInfo.roomList[i];
                                if(room.id == roomData.id) {
                                    room.members[0].roommember.isNotify = $scope.room.isNotify;
                                    break;
                                }
                            }

                        }, function(error){
                            console.error('Update Error', error);
                    });; 
                }
                $uibModalInstance.close('close');
            }

        }]);
});