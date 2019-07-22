define(['app'], function (app) {
    app.controller("RoomCreateController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.room = {
                name: ""
            }

            $scope.addRoom = function(){
                if($scope.room.name == ''){
                    return;
                }
                var roomData = {
                    name: $scope.room.name,
                    user: tchatInfo.currentUser
                };
                $http.post('room/add', roomData, { timeout: 30000}).then(function(){
                        console.log('Add Room OK');
                        $uibModalInstance.close('close');
                    }, function(error){
                        console.log('Add Room Error');
                });;
            }
        }]);
});