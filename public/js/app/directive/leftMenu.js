define(['app', 'directive/roomList', 'directive/popups/roomSetting/roomSetting', 'directive/popups/roomCreate/roomCreate', 'directive/popups/announceCreate/announceCreate'], function (app) {
    app.controller("LeftMenuController", ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService',
        function ($http, tchatInfo, $scope, $rootScope, modalService) {

            $scope.canAddRoom = false;

            $scope.onRoomConfigClick = function(){
                modalService.showModal('js/app/directive/popups/roomSetting/roomSetting.html', 'RoomSettingController' ).result.then(function(rs){
                });
            }

            $scope.onProfileClick = function(){
                modalService.showModal('js/app/directive/popups/userSetting/userSetting.html', 'UserSettingController' ).result.then(function(rs){
                });
            }

            $scope.onRoomCreateClick = function(){
                modalService.showModal('js/app/directive/popups/roomCreate/roomCreate.html', 'RoomCreateController' ).result.then(function(rs){
                });
            }

            $scope.onAnnounceMessage = function() {
                modalService.showModal('js/app/directive/popups/announceCreate/announceCreate.html', 'AnnounceCreateController').result.then(function(rs){
                });
            }

            $scope.logout = function(){
                $http.delete('logout').success(function(){
                    location.reload();
                });;
            };

            $rootScope.$on('currentUser:update' , function(event, data){ 
                $scope.canAddRoom = [1, 2, 3].indexOf(tchatInfo.currentUser.positionId) != -1; 
            });
    }]);
    
    app.directive('leftMenu', function () {
        return {
            restrict: 'A',
            controller: 'LeftMenuController',
            templateUrl: 'js/app/directive/template/leftMenu.html'
        };
    });
});