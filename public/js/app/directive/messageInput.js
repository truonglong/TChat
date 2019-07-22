define(['app', 'directive/popups/emoticon/emoticon', 'directive/popups/sendFile/sendFile'], function (app) {
    app.controller("MessageInputController", ['$scope', '$http', '$rootScope', 'tchatInfo', 'utils', 'modalService',
     function ($scope, $http, $rootScope, tchatInfo, utils, modalService) {
        $scope.messageBody = '';
        $scope.events = {};
        $scope.importantMessage = false;

        $scope.dataSend = [];
        var obj = $("#input-message-body");

        obj.on('dragover', function (e) {
            e.preventDefault();
            e.target.style.border = "2px solid #ffbf00";
        });

        obj.on('dragleave', function (e) {
            e.target.style.border = "";
        });

        obj.on('drop', function (e) {
            e.preventDefault();
            dataSend = e.originalEvent.dataTransfer.files;
            e.target.style.border = "";
            showModalSendFile(dataSend);
        });

        $scope.events.attachFile = function(){
            $('#fileAttachmentHidden').click();
        };

        $scope.events.selecetEmoticon = function(){
            modalService.showModal('js/app/directive/popups/emoticon/emoticon.html', 'EmoticonController');
        };

        $scope.checkImportantMessage = function(value) {
            $scope.importantMessage = value ? false : true;
        }

        var showModalSendFile = function(dataSend){
            modalService.showModal('js/app/directive/popups/sendFile/sendFile.html', 'SendFileController', dataSend);
        };

        $scope.postNormalMessage = function(){
            if($scope.messageBody != '' && tchatInfo.pendingMessageBody == ''){
                var messageBody = $scope.messageBody;
                tchatInfo.pendingMessageBody = messageBody
                $scope.postMessage(messageBody, $scope.importantMessage ? 7 : 1, null, null);
                $scope.messageBody = '';
                $scope.importantMessage = false;
                $('#input-message-body').focus();
            }
        };
        
        $scope.postCKEditorMessage = function(){
            var messageBody = CKEDITOR.instances.ckeditor.getData();
            if(messageBody != ''){
                $scope.postMessage(messageBody, 6, null, null);
                CKEDITOR.instances.ckeditor.setData('');
                if($('#ckeditorDialog')){
                    $('#ckeditorDialog').modal('hide');
                }
            }
        };
        
        $scope.postEmoticonMessage = function(emoticon){
            if(emoticon &&  tchatInfo.pendingEmoticon== 0){
                tchatInfo.pendingEmoticon = emoticon.id;
                $scope.postMessage('', 4, emoticon.id, null);
            }
        };
        
        $scope.postMessage = function(body, type, emoticon, fileAttachment){
            var messageData = {
                roomId: tchatInfo.currentRoom.id,
                memberId: tchatInfo.currentUser.id,
                messagetypeId: type,
                body: body,
                attachment: null,
                emoticonId: emoticon,
                attachmentFileName: null,
                fileAttachment: fileAttachment,
                reply: null
            };
            $http.post('message', messageData, { timeout: 30000}).error(function(err){
                window.prompt("Session Error!\nPlease copy your message and re-login again (Ctrl+C, Enter)", messageData.body);
                if(err === 'Unauthorized'){
                     $http.delete('logout').success(function(){
                        location.reload();
                    });;
                } else { 
                    location.reload();
                }
            });
        };
        
        $('#fileAttachmentHidden').change(function(event){
            if($('#fileAttachmentHidden')[0].files[0]){
                $('#testform').submit();
            }
            event.target.value = event.target.defaultValue;
        });
        
        $rootScope.$on('input:addEmoticon' , function(event, emoticon){$scope.postEmoticonMessage(emoticon); });
    }]);
    
    app.directive('messageInput', function () {
        return {
            restrict: 'A',
            controller: 'MessageInputController',
            templateUrl: 'js/app/directive/template/messageInput.html'
        };
    });
    
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keyup keypress", function (event) {
                if(event.keyCode == 13 && event.shiftKey){
                } else if(event.keyCode === 13) {
                    scope.$apply(function (){
                        if(attrs.ngEnter){
                            scope.$eval(attrs.ngEnter);
                        }
                    });
                    event.preventDefault();
                }
            });
        };
    });
});