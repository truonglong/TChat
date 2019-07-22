define(['app'], function (app) {
    app.controller("MessageReplyController",  ['$http', 'tchatInfo', '$scope', '$rootScope', 'modalService', '$uibModalInstance', 'data',
        function ($http, tchatInfo, $scope, $rootScope, modalService, $uibModalInstance, message) {
            $scope.close = function (){
                $uibModalInstance.close('close');
            }

            $scope.message = message;
            $scope.messageBody = message.body;
            $scope.messageReply = '';

            $scope.sendReplyMessage = function(){
                if($scope.messageReply != ''){
                    var messageData = {
                        roomId: tchatInfo.currentRoom.id,
                        memberId: tchatInfo.currentUser.id,
                        messagetypeId: 1,
                        body: $scope.messageReply,
                        attachment: null,
                        emoticonId: null,
                        attachmentFileName: null,
                        fileAttachment: null,
                        reply: $scope.message.id,
                        replyBody: $scope.messageBody
                    }
                    $scope.messageReply ='';
                    $http.post('message', messageData);
                    $uibModalInstance.close('close');
                }
            };

        }]);
});