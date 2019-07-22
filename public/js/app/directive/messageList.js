var dependencies = [
    'app',
    'directive/popups/messageEdit/messageEdit',
    'directive/popups/messageReply/messageReply',
    'directive/popups/imagePreview/imagePreview',
    'directive/popups/userProfile/userProfile'
];

define(dependencies, function (app) {
    app.controller("MessageListController",  ['$sce', 'tchatInfo', 'utils', '$scope', '$http', '$rootScope', 'modalService',
    function ($sce, tchatInfo, utils, $scope, $http, $rootScope, modalService) {
        $scope.messages = [];
        $scope.glued = true;
        $scope.isLoading = true;
        $scope.isLastPage = false;
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.firstId = 0;
        $scope.keepId = undefined;
        $scope.user = tchatInfo.currentUser;
        $scope.imageReview = {};
        $scope.backupDate = 0;
        $scope.room = tchatInfo.currentRoom;
        $scope.isNotify = true;
        $scope.viewuser;
        
        
        var insertMessage = function(message){
            console.log('currentRoom: ', $scope.room);
            if(message.memberId != tchatInfo.currentUser.id && (!utils.focused || message.roomId != tchatInfo.currentRoom.id)){
                var notifyData = {
                    icon: '/images/avatar/' + message.member.avatar,
                    roomName: '',
                    body: message.member.name + ":\n" + message.body
                };
                if(message.room.isAnonymous) {
                    notifyData.icon = '/images/avatar/anonymous.jpg';
                    notifyData.body = message.body
                }

                for(var index in tchatInfo.roomList){
                    if(tchatInfo.roomList[index].id == message.roomId){
                        notifyData.roomName = message.room.name;
                        break;
                    }
                }
                if(notifyData.roomName == ''){
                    return;
                }
                var desktopNotify = true;
                for(var i in tchatInfo.roomList){
                    var room = tchatInfo.roomList[i];
                    if(room.id == message.roomId) {
                        if (room.members) {
                            desktopNotify = room.members[0].roommember.isNotify;
                            console.log('roommember: ', room.members[0].roommember);
                        }
                        break;
                    }
                }
                if(notifyData.icon !== '' && notifyData.roomName !== ''){
                    utils.notify(notifyData, desktopNotify);
                }
            }
            if(message.messagereply != null){
                message.messagereply.tempTime = utils.convertToDayTime(message.messagereply.time);
                    //if(message.messagereply.messagetypeId == 1){
                        console.log('Replay body: ' + message.messagereply.body);
                        var sourceMember = getMemberFromList(message.messagereply.memberId);
                        var quoteMsg = message.room.isAnonymous? '' : (sourceMember.user.name + ' ');
                        quoteMsg += '(' + message.messagereply.tempTime + '):';
                        if(message.messagereply.body && message.messagereply.body.length > 0){
                            quoteMsg += '\n' + message.messagereply.body;
                        }
                        message.messagereply.tempBody = detectLinkInMessage(quoteMsg);
                    //}
                    
            }
            if(message && message.roomId == tchatInfo.currentRoom.id){
                message.tempBody = detectLinkInMessage(message.body);
                if(message.memberId == tchatInfo.currentUser.id){
                    if(tchatInfo.pendingEmoticon == message.emoticonId){
                        tchatInfo.pendingEmoticon = 0;
                    } else if(tchatInfo.pendingMessageBody == message.body){
                        tchatInfo.pendingMessageBody = '';
                    }
                }
                var n = $scope.messages.length - 1;
                if(n == -1 || utils.compareDate(message.time, $scope.messages[n].messageList[$scope.messages[n].messageList.length-1].time) == 1){
                    n++;
                    var tempDate = new Date(message.time);
                    $scope.messages[n] = {};
                    $scope.messages[n].time = message.time;
                    $scope.messages[n].dateLabel = utils.convertLongTime(message.time);
                }
                message.tempTime = utils.convertShortTime(message.time);
                if($scope.messages[n] && $scope.messages[n].member && $scope.messages[n].member.id == message.memberId){
                } else {
                    n++;
                    $scope.messages[n] = {};
                    $scope.messages[n].member = message.member;
                    $scope.messages[n].messageList = [];
                }
                $scope.messages[n].messageList.push(message);
                setTimeout(function () {
                    var rowContent = $('#messageid-' + message.id);
                    if (!rowContent) return;
                    rowContent.css({ opacity: 0.2 });

                    rowContent.animate({
                        right: "-=5",
                        top: "+=2",
                    }, 1, function () {
                        rowContent.animate({
                            opacity: 1.0,
                            right: "+=5",
                            top: "-=2"
                        }, 200, function () {
                        });
                    });
                }, 0);
            } else {
                $scope.$emit('room:newmessage', message.room);
            }
        }
        
        var updateMessage = function(message){
            if(message){
                for(var i in $scope.messages){
                    for(var j in $scope.messages[i].messageList){
                        if($scope.messages[i].messageList[j].id == message.id){
                            message.tempBody = detectLinkInMessage(message.body);
                            $scope.messages[i].messageList[j].messagetypeId = message.messagetypeId;
                            $scope.messages[i].messageList[j].body = message.body;
                            $scope.messages[i].messageList[j].tempBody = detectLinkInMessage(message.body);
                            break;
                        }
                    }
                }
            }
        }

        var updateMemberInMessage = function(memberData){
            if(memberData){
                for(var i in $scope.messages){
                    for(var j in $scope.messages[i].messageList){
                        if($scope.messages[i].messageList[j].member && $scope.messages[i].messageList[j].member.id == memberData.id){
                            if(memberData.avatar){
                                $scope.messages[i].messageList[j].member.avatar = memberData.avatar;    
                            }
                            if(memberData.name){
                                $scope.messages[i].messageList[j].member.name = memberData.name;    
                            }
                            break;
                        }
                    }
                }
            }
        }
        
        var getMessageList = function(roomId, time, isLoadMore){

            $scope.room = tchatInfo.currentRoom;
            tchatInfo.memberList.forEach(function(member) {
                if(member.id == tchatInfo.currentUser.id ) {
                    $scope.isNotify = member.rooms[0].roommember.isNotify;
                    return;
                }
            });
            $http.get('message/list/' + roomId + '/' + time).success(function(data) {

                if(!isLoadMore){
                    $scope.messages = [];
                }
                if(data.length > 0){
                    if(isLoadMore){
                        data = data.splice(1);
                        if($scope.messages[0] && data[0]){
                            if(utils.compareDate($scope.messages[0].time, data[0].time) == 0){
                                $scope.messages = $scope.messages.splice(1);
                            }
                        }
                    }

                    $scope.messages = convertMessageList(data).concat($scope.messages);
                }
                if(isLoadMore){
                    $scope.isLoading = !$scope.isLoading;
                    var messageUL = $('#messageList');
                    setTimeout(function(){
                        messageUL.scrollTop(messageUL[0].scrollHeight - $scope.keepId);
                    }, 0);
                }
             
                if(data.length < 39){
                    $scope.isLastPage = true;
                } else {
                    $scope.isLastPage = false;
                }

            }).error(function(err){
                if(err === 'Unauthorized'){
                     $http.delete('logout').success(function(){
                        location.reload();
                    });;
                } else { location.reload();
            }
            });
        }
        
        var convertMessageList = function(messageList){
            var tempMessageList = [];
            var n = -1;
            var lastDate = 0;
            for(var index = messageList.length - 1; index >=0; index--){
                if (messageList[index].messagetypeId == 1 || messageList[index].messagetypeId == 7) {
                    messageList[index].tempBody = detectLinkInMessage(messageList[index].body);
                }
                messageList[index].tempTime = utils.convertShortTime(messageList[index].time);
                if(messageList[index].messagereply != null){
                    messageList[index].messagereply.tempTime = utils.convertToDayTime(messageList[index].messagereply.time);

                    //if(messageList[index].messagereply.messagetypeId == 1){
                        var sourceMember = getMemberFromList(messageList[index].messagereply.memberId);
                        var quoteMsg = $scope.room.isAnonymous? '' : (sourceMember.user.name + ' ');
                        quoteMsg += '(' + messageList[index].messagereply.tempTime + '):';
                        if(messageList[index].messagereply.body && messageList[index].messagereply.body.length > 0){
                            quoteMsg += '\n' + messageList[index].messagereply.body;
                        }
                        messageList[index].messagereply.tempBody = detectLinkInMessage(quoteMsg);
                    //}
                    
                }
                if(utils.compareDate(messageList[index].time, lastDate) == 1){
                    n++;
                    var tempDate = new Date(messageList[index].time);
                    tempMessageList[n] = {};
                    tempMessageList[n].time = messageList[index].time;
                    tempMessageList[n].dateLabel = utils.convertLongTime(messageList[index].time);
                    lastDate = messageList[index].time;
                }
                
                if(tempMessageList[n] && tempMessageList[n].member && tempMessageList[n].member.id == messageList[index].memberId){
                } else {
                    n++;
                    tempMessageList[n] = {};
                    tempMessageList[n].messageList = [];
                    tempMessageList[n].member = messageList[index].member;
                    tempMessageList[n].index = $scope.firstId;
                    $scope.firstId++;
                }
                tempMessageList[n].messageList.push(messageList[index]);
            }
            return tempMessageList;
        }
        
        var getMemberFromList = function(id){
            for(var index in tchatInfo.memberList){
                if(tchatInfo.memberList[index].user.id == id){
                    return tchatInfo.memberList[index];
                }
            }
            return null;
        }
        
        var loadmoreMessage = function(scrollHeight){
            if(!$scope.isLastPage){
                $scope.isLoading = !$scope.isLoading;
                $scope.$apply();
                //$scope.isLastPage = true;
                $scope.keepId = $('#messageList')[0].scrollHeight;
                setTimeout(function(){
                    getMessageList(tchatInfo.currentRoom.id, $scope.messages[1].messageList[0].time, true);
                }, 0);
            }
        }
        
        var detectLinkInMessage = function (message) {

            var msgContent = utils.escapeHTML(message);
            var tempList = msgContent.split('<br>');
            msgContent = '';
            for (i in tempList) {
                msgContent += tempList[i].replace(/(((http|https|ftp|ftps)\:\/\/|www\.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g, '<a href="$1" target="_blank">$1</a>');
                msgContent += '<br>';
            }

            return msgContent;
        }
        
        $('#messageList').bind("scroll", function () {
            var list = $('#messageList');
            if(list.scrollTop() == 0){
            
                loadmoreMessage(list.scrollHeight);
            }
        });
        
        $scope.deleteMessage = function(message){
            var messageData = {
                id: message.id
            };
            $http.put('message/delete', messageData);
        }
        
        $scope.editMessage = function(message){
            if(message){
                modalService.showModal('js/app/directive/popups/messageEdit/messageEdit.html', 'MessageEditController', message);
                
            }
        }
        
        $scope.replyMessage = function(message){
            if(message){
                modalService.showModal('js/app/directive/popups/messageReply/messageReply.html', 'MessageReplyController', message);
            }
        }

        $scope.openReviewDialog = function(message){
            if(message){
                modalService.showModal('js/app/directive/popups/imagePreview/imagePreview.html', 'ImagePreviewController', message, {windowClass: 'MsgImagePreview'});
            }
        }
        
        
        
        $scope.closeReviewDialog = function(){
            $('#reviewDialog').modal('hide');
        }

        $scope.viewProfileMember = function(user){
            if($scope.room.isAnonymous) {
                return;
            }
            if(user){
                modalService.showModal('js/app/directive/popups/userProfile/userProfile.html', 'UserProfileController', user);
            }
        }


        /*
         * Event listeners
         * 
         */
        $rootScope.$on('currentUser:update' , function(event, user){ 
            console.log('currentUser on timeline', user);
            $scope.user = user;

        });

        $rootScope.$on('getMessageList' , function(event, roomId){ getMessageList(roomId, Number.MAX_VALUE, false); });
        $rootScope.$on('reconnecting' , function(event, roomId){ getMessageList(roomId, Number.MAX_VALUE, false); });
        $rootScope.$on('message:insert' , function(event, message){insertMessage(message); });
        $rootScope.$on('message:update' , function(event, message){updateMessage(message); });
        $rootScope.$on('member:update' , function(event, data){ updateMemberInMessage(data);});
        $rootScope.$on('message:updateUser' , function(event, user){$scope.user = user;});
    }]);
    
    app.directive('messageList', function () {
        return {
            restrict: 'A',
            controller: 'MessageListController',
            templateUrl: 'js/app/directive/template/messageList.html'
        };
    });
});