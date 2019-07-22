define(['app'], function (app) {
    app.controller("MessageEditController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance', 'data',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, message) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.message = message;
            $scope.messageUpdate = message.body;
            

            $scope.sendUpdateMessage = function(){
                if($scope.messageUpdate != ''){
                    var messageData = {
                        id: $scope.message.id,
                        body: $scope.messageUpdate
                    };
                    $http.put('message/update', messageData, {timeout: 30000}).error(function(err){
                        window.prompt("Session Error!\nPlease copy your message and re-login again (Ctrl+C, Enter)", messageData.body);
                        if(err === 'Unauthorized'){
                             $http.delete('logout').success(function(){
                                location.reload();
                            });;
                        } else { 
                            location.reload();
                        }
                    });
                }
                $uibModalInstance.close('close');
            }
        }]);
});