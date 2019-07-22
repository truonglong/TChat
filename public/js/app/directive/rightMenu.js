define(['app', 'directive/popups/userProfile/userProfile'], function (app) {
    app.controller("RightMenuController", ['tchatInfo', '$scope', '$http', '$rootScope', 'modalService',
        function (tchatInfo, $scope, $http, $rootScope, modalService) {
        $scope.members = [];
    
        var getMemberList = function(roomId, willGetMessageList){
            $http.get('api/member/list/' + roomId).success(function(data) {
                $scope.members = data;
                tchatInfo.memberList = data;
                $rootScope.$broadcast('member:getMemberListFinished');
                if(willGetMessageList) $scope.$emit('getMessageList', roomId);
                $scope.sortMember();
            });
        }
        
        $scope.sortMember = function(){
            $scope.members.sort(function(ma, mb){
                var a = ma.user, b = mb.user;
                var cmp1 = b.status - a.status;
                if (cmp1 != 0) {
                    return cmp1;
                }
                var name1 = a.name,
                    name2 = b.name;
                var collator = new Intl.Collator('vi');
                var cmp2 = collator.compare(name1, name2);
                if (cmp2 != 0) {
                    return cmp2;
                }
                return a.id - b.id;
            });
        };

        $scope.viewProfile = function(user){
            if(user){
                modalService.showModal('js/app/directive/popups/userProfile/userProfile.html', 'UserProfileController', user);
            }
        }
        
        var updateMember = function(data){
            console.log('Update member');
            
            for(var index in $scope.members){
                if(data.id == $scope.members[index].user.id){
                    if(data.status) {
                        $scope.members[index].user.status = data.status;
                    }
                    if(data.avatar) {
                        $scope.members[index].user.avatar = data.avatar;
                    }
                    if(data.name) {
                        $scope.members[index].user.name = data.name;
                    }

                    $scope.sortMember();
                    break;
                }
            }
        }
        var updateRoom = function(data){
            if(data.id == tchatInfo.currentRoom.id) {
                getMemberList(data.id, false);     
            }
        }
        
        $rootScope.$on('getMemberList' , function(event, roomId){ getMemberList(roomId, true); });
        $rootScope.$on('member:update' , function(event, data){ updateMember(data); });
        $rootScope.$on('room:update' , function(event, data){ updateRoom(data); });
    }]);
    
    app.directive('rightMenu', function () {
        return {
            restrict: 'A',
            controller: 'RightMenuController',
            templateUrl: 'js/app/directive/template/rightMenu.html'
        };
    });
});