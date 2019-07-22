var session = require('./session');
var chatDAO = require('../models/chatDAO');
var roommemberDAO = require('../models/roommemberDAO');
var chatDAO = require('../models/chatDAO');
var io;
var roomList = [];
var conversationList = [];
var clientList = [];

exports.start = function (server) {
    io = require('socket.io').listen(server);
    io.of('/chat').on('connection', function (socket) {
        socket.emit("getSomeData",{data: "some random data"});
        
        socket.on('initRoom', function (data) {
            socket.session = data;
            clientList.push(socket);
            session.changeLoginStatus(socket.session, 1);
            var memberId = session.getIdFromSession(data);
            if(memberId != ''){
                roommemberDAO.listRoom({id: memberId}, function(rooms) {
                    for(var index in rooms){
                        addNewRoom(rooms[index].dataValues.id);
                        addSocketToRoom(rooms[index].dataValues.id, socket);
                    }
                });
                chatDAO.getConversationByMember(memberId, function(conversations) {
                    for(var index in conversations){
                        addNewConversation(conversations[index].dataValues.conversationId);
                        addSocketToConversation(conversations[index].dataValues.conversationId, socket);
                    }
                });
            }
        });

        socket.on('message', function (data) {
            console.log('__ user ID: ' + socket.session);
            console.log('onMesasge: ' + data);
        });

        socket.on('disconnect', function () {
            for(var i in roomList){
                var index = roomList[i].clientList.indexOf(socket);
                if (index != -1) {
                    roomList[i].clientList.splice(index, 1);
                }
            }
            for(var i in conversationList){
                var index = conversationList[i].clientList.indexOf(socket);
                if (index != -1) {
                    conversationList[i].clientList.splice(index, 1);
                }
            }
            clientList.splice(clientList.indexOf(socket), 1);//Remove client socket
            session.changeLoginStatus(socket.session, 0);
        });
    });
}

exports.sendMessage = function (type, message) {
    if(io != undefined) {
        var tempMessage = {
            type: type,
            data: message
        };
        io.of('/chat').emit('tchatsocket', tempMessage);
    }
}

exports.sendMessageToRoom = function (roomId, type, message) {
    if(io != undefined) {
        var tempMessage = {
            type: type,
            data: message
        };
        for(var i in roomList){
            if(roomList[i].roomId == roomId){
                for(var j in roomList[i].clientList){
                    roomList[i].clientList[j].emit('tchatsocket', tempMessage);
                }
            }
        }
    }
}

exports.sendMessageToConversation = function (conversationId, type, message) {
    if(io != undefined) {
        var tempMessage = {
            type: type,
            data: message
        };
        for(var i in conversationList){
            console.log('conversationList', i);
            if(conversationList[i].conversationId == conversationId){
                console.log('conversationList[i].conversationId == conversationId');
                for(var j in conversationList[i].clientList){
                    console.log('clientList: ', j);
                    conversationList[i].clientList[j].emit('tchatsocket', tempMessage);
                }
            }
        }
    }
}

function addNewRoom(roomId){
    for(var index in roomList){
        if(roomList[index].roomId == roomId){
            return;
        }
    }
    var tempRoom = {
        roomId: roomId,
        clientList: []
    }
    roomList.push(tempRoom);
}

function addSocketToRoom(roomId, socket){
    for(var index in roomList){
        if(roomList[index].roomId == roomId){
            roomList[index].clientList.push(socket);
            return;
        }
    }
}

function removeSocketFromRoom(roomId) {
    for(var index in roomList) {
        if (roomList[index].roomId == roomId){
            roomList[index].clientList.splice(0, roomList[index].clientList.length);
            console.log('remove clientList: ' + roomList[index].clientList.length);
            break;
        }
    }
}

function addNewConversation(conversationId){
    for(var index in conversationList){
        if(conversationList[index].conversationId == conversationId){
            return;
        }
    }
    var tempRoom = {
        conversationId: conversationId,
        clientList: []
    }
    conversationList.push(tempRoom);
}

function addSocketToConversation(conversationId, socket){
    for(var index in conversationList){
        if(conversationList[index].conversationId == conversationId){
            conversationList[index].clientList.push(socket);
            return;
        }
    }
}

exports.createNewConversation = function(conversationId, memberList){
    addNewConversation(conversationId);
    var numberOfMember = memberList.length,
        countMember = 0;
    for(var i in clientList){
        var memberId = session.getIdFromSession(clientList[i].session);
        for(var j in memberList){
            if(memberList[j].id == memberId){
                countMember++;
                addSocketToConversation(conversationId, clientList[i]);
                if(countMember == numberOfMember){
                    return;
                }
            }
        }
    }
}

exports.createNewRoom = function(roomId, memberList) {
    addNewRoom(roomId);
    removeSocketFromRoom(roomId);
    for(var i in clientList) {
        var memberId = session.getIdFromSession(clientList[i].session);
        for (var j in memberList) {
            if (memberList[j].memberId == memberId) {
                addSocketToRoom(roomId, clientList[i]);
            }
        }
    }
}

exports.sendNotification = function(type, notification) {
    if (io != undefined) {
        var tempMessage = {
            type: type,
            data: notification
        };
        for (i in clientList) {
            clientList[i].emit('tchatsocket', tempMessage);
        }
    }
}