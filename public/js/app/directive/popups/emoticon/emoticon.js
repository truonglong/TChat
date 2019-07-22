define(['app'], function (app) {
    app.controller("EmoticonController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.groups = [];
            $scope.events = {};
            var getGroupList = function(){
                if($scope.groups.length == 0){
                    $http.get('emoticongroup').success(function(data) {
                        for(var index in data){
                            data.class = '';
                            data.emoticons = [];
                        }
                        $scope.groups = data;
                        if($scope.groups.length > 0){
                            $scope.groups[0].class = 'active';
                            $scope.getEmoticonList(data[0]);
                        }
                    });
                }
            };
            
            $scope.getEmoticonList = function(group){
                if(group.emoticons == undefined || group.emoticons.length == 0){
                    $http.get('emoticon/' + group.id).success(function(data) {
                        for(var index in $scope.groups){
                            if($scope.groups[index].id == group.id){
                                $scope.groups[index].emoticons = data;
                                break;
                            }
                        }
                    });
                }
            }
            
            $scope.postEmoticonMessage = function(emoticon){
                $scope.$emit('input:addEmoticon', emoticon);
                $uibModalInstance.close('close');
            }
            
            getGroupList();
        }]);
});