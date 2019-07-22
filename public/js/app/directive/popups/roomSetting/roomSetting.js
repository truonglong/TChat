define(['app'], function (app) {
    app.controller("RoomSettingController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.rooms = [];
            if(tchatInfo.roomList) {
                 tchatInfo.roomList.forEach(function(el){
                    $scope.rooms.push(el);
                });
            }

            $scope.toggleVisible = function (room){
                room.isVisible = !room.isVisible;
            }

            $scope.toggleNotify = function (room){
                room.isNotify = !room.isNotify;
            }
            
            $scope.updateSetting = function(){
                $http.post('room/setting', $scope.rooms, { timeout: 30000}).then(function(){
                        console.log('Update OK');
                        for(var i in tchatInfo.roomList){
                            for(var j in  $scope.rooms){
                                if(tchatInfo.roomList[i].id == $scope.rooms[j].id){
                                    tchatInfo.roomList[i].isNotify = $scope.rooms[j].isNotify;
                                    tchatInfo.roomList[i].isVisible = $scope.rooms[j].isVisible;
                                    if (!tchatInfo.currentRoom.isVisible && tchatInfo.roomList[i].isVisible) {
                                        tchatInfo.currentRoom = tchatInfo.roomList[i];
                                        // $scope.$emit('room:switchRoom123', tchatInfo.currentRoom);
                                    }
                                    break;
                                }
                            }
                        }
                    }, function(error){
                        console.error('Update Error', error);
                });
                $uibModalInstance.close('close');
            }
        }]);
});