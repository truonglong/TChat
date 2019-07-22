define(['app', 'directive/popups/userSetting/userSetting'], function (app) {
    app.controller("RoomHeaderController", ['tchatInfo', '$scope', '$rootScope', 'modalService',
        function (tchatInfo, $scope, $rootScope, modalService) {
            $scope.room = tchatInfo.currentRoom;
            $scope.user = tchatInfo.currentUser;
            $scope.notification = tchatInfo.notification;
            console.log($scope.user);


            $rootScope.$on('currentUser:update' , function(event, user){ 
                console.log('currentUser', user);
                $scope.user = user;
            });

            $rootScope.$on('room:switchRoom' , function(event, room){
                $scope.room = room;
            });

            $scope.userSetting = function() {
                modalService.showModal('js/app/directive/popups/userSetting/userSetting.html', 'UserSettingController' ).result.then(function(rs){
                        // console.log('result: ', rs);
                });
            }

            $rootScope.$on('member:update' , function(event, data){ 
                console.log('header user: ', data);
                $scope.user = data;
            });

            $rootScope.$on('notification:update' , function(event, data){
                $scope.notification = data;
                $('.timeline-pushpin').show();
            });
    }]);
    
    app.directive('roomHeader', function () {
        return {
            restrict: 'A',
            controller: 'RoomHeaderController',
            templateUrl: 'js/app/directive/template/roomHeader.html'
        };
    });
});