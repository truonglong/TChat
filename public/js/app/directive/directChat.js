define(['app'], function (app) {
    app.controller('DirectChatController', ['tchatInfo', '$scope', '$http', '$rootScope', 'utils', function (tchatInfo, $scope, $http, $rootScope, utils) {
        $scope.chatMembers = [];
        $scope.conversationList = [];
        $scope.collapseListMore = false;
        var MAX_DATE = 32506358400000;
        
        $scope.changeCollapseListMore = function(){
            $scope.collapseListMore = !$scope.collapseListMore;
        }
        
        var getMemberList = function(roomId){
            $http.get('member/listall').success(function(data) {
                for(var index in data){
                    if(data[index].id == tchatInfo.currentUser.id || data[index].id == 2){
                       data[index].isDisplay = false;
                    } else {
                        data[index].isDisplay = true;
                    }
                }
                console.log('all member list: ', data);
                $scope.chatMembers = data;
                $scope.sortMember();
                tchatInfo.allMemberList =  $scope.chatMembers;
                $rootScope.$broadcast('member:getAllMembersFinished');
            });
        }
        
        $scope.switchChat = function(conversation){
            conversation.newMsgCount = 0;
            if($scope.conversationList[2]){
                var temp = $scope.conversationList[2];
                var tempIndex = conversation.index;
                $scope.conversationList[2] = conversation;
                $scope.conversationList[2].index = 3;
                $scope.conversationList[tempIndex - 1] = temp;
                $scope.conversationList[tempIndex - 1].index = tempIndex;
            }
        }
        
        $scope.sortMember = function(){
            $scope.chatMembers.sort(function(a, b){
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
        
        var updateMember = function(data){
            for(var index in $scope.chatMembers){
                if(data.id == $scope.chatMembers[index].id){
                    $scope.chatMembers[index].status = data.status;
                    $scope.sortMember();
                    break;
                }
            }
        }
        
        $scope.openchat = function(member){
            if(member.conversation){
                for(var index in $scope.conversationList){
                    if($scope.conversationList[index].id == member.conversation.id){
                        return;
                    }
                }
                member.conversation.index = $scope.conversationList.length + 1;
                $scope.conversationList.push(member.conversation);
                $scope.getChatMessage(member.conversation.id, MAX_DATE);
            } else {
                var conversation = {};
                conversation.messageList = [];
                conversation.index = $scope.conversationList.length + 1;
                conversation.messageBody = '';
                $http.get('/chat/conversation/' + member.id).success(function(data) {
                    conversation.id = data.id;
                    if(data.name === ''){
                        conversation.name = member.name;
                    } else {
                        conversation.name = data.name;
                    }
                    conversation.newMsgCount = 0;
                    conversation.isPersonal = data.isPersonal;
                    $scope.conversationList.push(conversation);
                    updateConversation(member.id, conversation);
                    $scope.getChatMessage(conversation.id, MAX_DATE);
                });
            }
        }
        
        $scope.openChatWhenHaveMessage = function(memberId, conversationId){
            var conversation = {};
            conversation.messageList = [];
            conversation.index = $scope.conversationList.length + 1;
            conversation.messageBody = '';
            $http.get('/chat/conversation/info/' + conversationId).success(function(data) {
                conversation.id = data.id;
                if(data.name === ''){
                    var tempData = getDataSender(memberId);
                    conversation.name = tempData.name;
                } else {
                    conversation.name = data.name;
                }
                conversation.newMsgCount = 0;
                conversation.isPersonal = data.isPersonal;
                $scope.conversationList.push(conversation);
                updateConversation(memberId, conversation);
                $scope.getChatMessage(conversation.id, MAX_DATE);
            });
        }

        $scope.collapseList = function(id){
            
            var conv;
            for(i in $scope.conversationList) {
                if($scope.conversationList[i].id  == id){
                    conv = $scope.conversationList[i];
                }
            }

            var height = 267;
            if(id == undefined){
                id = '';
                height = '50%';
            } else {
                id = '-' + id;
            }
            if($('#chat-window' + id).height() != 28){
                // collapse
                $('#chat-window' + id).height(28);
                if(conv) conv.isCollapsed = true;
            } else {
                // expand
                if(conv) {
                    conv.isCollapsed = false;
                    conv.newMsgCount = 0;
                }
                $('#chat-window' + id).height(height);
            }
        }
        
        $scope.removeChat = function(member){
            for(var index in $scope.conversationList){
                if($scope.conversationList[index].id == member.id){
                    $scope.conversationList[index].newMsgCount = 0;
                    $scope.conversationList.splice(index, 1);
                    $scope.updateIndex(index);
                    break;
                }
            }
        }
        
        $scope.updateIndex = function(index){
            for(var index = 0; index <  $scope.conversationList.length; index++){
                $scope.conversationList[index].index = index + 1;
            }
        }

        $scope.postChat = function(event, conversation){
            if (event.keyCode == 13) {
                event.preventDefault();
                $scope.insertChat(conversation.id, conversation.messageBody, 1, null);
                conversation.messageBody = '';
            }
        }
        
        $scope.insertChat = function(idConversation, content, type, emoticon){
            var chatData = {
                memberId: tchatInfo.currentUser.id,
                conversationId: idConversation,
                messagetypeId: type,
                content: content,
                emoticonId: emoticon
            };
            $http.post('chat', chatData);
        };
        
        $scope.getChatMessage = function(idConversation, time){
            $http.get('/chat/list/' + idConversation + '/' + time).success(function(data) {
                for(var index in $scope.conversationList){
                    if($scope.conversationList[index].id == idConversation){
                        $scope.conversationList[index].messageList = [];
                        for(var i = data.length - 1; i >=0; i--){
                            var chat = data[i];
                            chat.convertedTime = utils.convertLongTime(chat.time) + ' ' + utils.convertShortTime(chat.time);
                            $scope.conversationList[index].messageList.push(chat);
                        }
                        break;
                    }
                }
            });
        };
        
        var insertChat = function(chat){
            console.log('insert chat', chat);
            var check = true;
            var notifyData = {
                icon: chat.member.avatar,
                roomName: '[chat] ' + chat.member.name,
                body: chat.content
            };
            for(var index in $scope.conversationList){
                if($scope.conversationList[index].id == chat.conversationId){
                    var conv = $scope.conversationList[index];

                    
                    chat.convertedTime = utils.convertLongTime(chat.time) + ' ' + utils.convertShortTime(chat.time);
                    conv.messageList.push(chat);
                    check = false;

                    // display new message if collapsed
                    if(conv.isCollapsed) {
                        if(!conv.newMsgCount) {
                            conv.newMsgCount = 0;
                        }
                        conv.newMsgCount ++ ;
                    } else {
                        conv.newMsgCount = 0;
                    }
                    break;
                }
            }
            if(check){
                $scope.openChatWhenHaveMessage(chat.member.id, chat.conversationId);
            }
            if(!utils.focused) {
                utils.notify(notifyData);    
            }
        }
        
        var getDataSender = function(id){
            for(var index in $scope.chatMembers){
                if($scope.chatMembers[index].id == id){
                    var tempData = {
                        avatar: $scope.chatMembers[index].avatar,
                        name: $scope.chatMembers[index].name
                    };
                    return tempData;
                }
            }
            return null;
        }
        
        var updateConversation = function(id, conversation){
            for(var index in $scope.chatMembers){
                if($scope.chatMembers[index].id == id){
                    $scope.chatMembers[index].conversation = conversation;
                }
            }
        }
        
        getMemberList();
        $rootScope.$on('member:status' , function(event, data){ updateMember(data); });
        $rootScope.$on('chat:insert' , function(event, chat){insertChat(chat); });
    }]);

    app.directive('directChat', function () {
        return {
            restrict: 'A',
            controller: 'DirectChatController',
            templateUrl: 'js/app/directive/template/directChat.html'
        };
    });
});