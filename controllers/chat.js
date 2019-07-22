var chatDAO = require('../models/chatDAO'),
    memberDAO = require('../models/memberDAO'),
    roommemberDAO = require('../models/roommemberDAO'),
    emoticonDAO = require('../models/emoticonDAO'),
    session = require('../controllers/session'),
    socket = require('./socket'),
    fs = require('fs'),
    tchatApp = require('../app');
 
exports.list = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.params.conversationId){
        chatDAO.list(req.params.conversationId, req.params.time, function(chatList){
            res.send(200, chatList); 
        }, function(err){
            res.send(500);
        });
    } else {
        res.send(500);
    }
};

exports.conversation = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.params.idReceiver){
        chatDAO.getConversation(idUser, req.params.idReceiver, function(conversation){
            if(conversation[0] && conversation[0].length == 0){
                var memberList = [{
                        id: idUser
                    },{
                        id: req.params.idReceiver
                }];
                createConversation('', 1, memberList, res);
            } else {
                res.send(200, conversation[0][0]); 
            }
        }, function(err){
            res.send(500);
        });
    } else {
        res.send(500);
    }
};

exports.getConversation = function (req, res) {
    chatDAO.getConversationInfo(req.params.id, function(conversation){
        res.send(200, conversation);
    }, function(err){
        res.send(404);
    });
};

exports.insert = function (req, res) {
    if (req.body == undefined) return;
    var requestBody = req.body;
    var chatData = {
        memberId: requestBody.memberId,
        conversationId: requestBody.conversationId,
        messagetypeId: requestBody.messagetypeId,
        content: requestBody.content,
        emoticonId: requestBody.emoticonId,
        time: new Date().getTime(),
    };
    /*if(req.files && req.files.attachment){
        if (parseInt(req.files.attachment.size) > 10240000) {
            fs.unlinkSync(req.files.attachment.path);
            res.status(400);
            res.send('');
            return;
        }

        fs.readFile(req.files.attachment.path, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var fileName = req.files.attachment.name;
                chatData.attachmentFileName = fileName;
                var extension = fileName.substring(fileName.lastIndexOf('.'));
                
                var filePath = 'upload/' + requestBody.room + new Date().getTime() + extension;
                chatData.attachment = filePath;
                fs.writeFile(tchatApp.__rootdirname + '/public/' + filePath, data, 'binary', function (err) {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlinkSync(req.files.attachment.path);
                    if (chatData.attachmentFileName.match(/\.(jpg|jpeg|png|gif)$/)){
                        chatData.type = 3;
                    } else {
                        chatData.type = 2;
                    }
                    chatData.emoticon = null;
                    insertChat(chatData);
                });
            }
        });
    } else {*/
        insertChat(chatData);
    //}
    res.send(200);
};

function insertChat(chatData){
    chatData.time = new Date().getTime();
    chatDAO.insert(chatData, function(chat){
        chatDAO.get(chat.dataValues.id, function(fullChat){
            console.log('sendMessageToConversation');
            socket.sendMessageToConversation(fullChat.dataValues.conversationId, 'insertChat', fullChat);
        });
    });
}

function createConversation(name, isPersonal, memberList, res){
    if(memberList && memberList.length < 2){
        res.send(500);
    } else {
        var conversationData = {
            name: name,
            isPersonal: isPersonal
        };
        chatDAO.createConversation(conversationData, function(conversation){
            var n = 0;
            for(var index in memberList){
                var conversationMemberData = {
                    conversationId: conversation.dataValues.id,
                    memberId: memberList[index].id
                };
                chatDAO.insertConversationMember(conversationMemberData, function(conversationMember){
                    n++;
                    if(n == memberList.length){
                        socket.createNewConversation(conversation.dataValues.id, memberList);
                        res.send(200, conversation);
                    }
                }, function(err){
                    res.send(500);
                });
            }
        }, function(err){
            res.send(500);
        });
    }
}