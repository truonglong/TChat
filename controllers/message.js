var messageDAO = require('../models/messageDAO'),
    memberDAO = require('../models/memberDAO'),
    roommemberDAO = require('../models/roommemberDAO'),
    emoticonDAO = require('../models/emoticonDAO'),
    session = require('../controllers/session'),
    socket = require('./socket'),
    fs = require('fs'),
    jimp = require("jimp"),
    sizeOf = require('image-size')
    tchatApp = require('../app');

/*
 * 
 * Functions
 * 
 */

/*
 * 
 * Exports
 * 
 */

/*
 * 
 * APIs
 * 
 */

exports.list = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.params.id){
        roommemberDAO.listMember({id: req.params.id}, function(members){
            var check = false;
            for(var index in members){
                if(members[index].id == idUser){
                    check = true;
                    break;
                }
            }
            if(check){
                messageDAO.list(req.params.id, req.params.time, function(messageList){
                    res.send(200, messageList);
                }, function(err){
                    res.send(500);
                });
            }
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};

exports.insert = function (req, res) {
    if (req.body == undefined) return;
    var requestBody = req.body;
    var messageData = {
        roomId: requestBody.roomId,
        memberId: requestBody.memberId,
        messagetypeId: requestBody.messagetypeId,
        body: requestBody.body,
        attachment: requestBody.attachment,
        emoticonId: requestBody.emoticonId,
        attachmentFileName: requestBody.attachmentFileName,
        time: new Date().getTime(),
        reply: requestBody.reply,
        replyBody: requestBody.replyBody
    };
    if(req.files && req.files.attachment){
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
                messageData.attachmentFileName = fileName;
                var extension = fileName.substring(fileName.lastIndexOf('.'));
                
                var filePath = 'upload/' + requestBody.roomId + new Date().getTime() + extension;
                messageData.attachment = filePath;
                fs.writeFile(tchatApp.__rootdirname + '/public/' + filePath, data, 'binary', function (err) {
                    if (err) {
                        console.log(err);
                    }
                    fs.unlinkSync(req.files.attachment.path);
                    if (messageData.attachmentFileName.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/)){
                        messageData.messagetypeId = 3;
                        var dimensions = sizeOf(tchatApp.__rootdirname + '/public/' + filePath);
                        var fileThumb = tchatApp.__rootdirname + '/public/' + filePath.replace(/upload/g, 'upload/thumbnails');
                        if (dimensions.width <= 100 || dimensions.height <= 100 || dimensions.type.toLowerCase() == 'gif') {
                            fs.writeFile(fileThumb, data, 'binary', function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                messageData.emoticonId = null;
                                insertMessage(messageData);
                            });
                        } else {
                            jimp.read(tchatApp.__rootdirname + '/public/' + filePath, function (err, image) {
                                if (err) throw err;
                                image.resize(jimp.AUTO, 100) // resize
                                     .write(fileThumb, function(err) {
                                        if (err) throw err;
                                        messageData.emoticonId = null;
                                        insertMessage(messageData);
                                     }); // save
                            });
                        }
                    } else {
                        messageData.messagetypeId = 2;
                        messageData.emoticonId = null;
                        insertMessage(messageData);
                    }
                });
            }
        });
    } else {
        insertMessage(messageData);
    }
    res.send(200);
};

exports.cdelete = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.body.id){
        messageDAO.singleGet(req.body.id, function(message){
            if(message.dataValues.memberId == idUser){
                if(message.dataValues.attachment != null){
                    fs.unlink(tchatApp.__rootdirname + '/public/' + message.dataValues.attachment);
                }
                messageDAO.update({id: message.dataValues.id}, {body: null, messagetypeId: 5, attachment: null, attachmentFileName: null, emoticonId: null}, function(messaged){
                    messageDAO.singleGet(req.body.id, function(messages){
                        socket.sendMessage('deleteMessage', messages);
                    }, function(err){
                        res.send(500);
                    });
                }, function(err){
                    res.send(401);
                });
            } else {
                res.send(401);
            }
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};

exports.update = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.body.id){
        messageDAO.singleGet(req.body.id, function(message){
            if(message.memberId == idUser){
                messageDAO.update({id: message.id}, {body: req.body.body}, function(messaged){
                    messageDAO.singleGet(req.body.id, function(messages){
                        socket.sendMessage('deleteMessage', messages);
                        res.send(200);
                    }, function(err){
                        res.send(401);
                    });
                }, function(err){
                    res.send(500);
                });
            }
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};

function insertMessage(messageData){
    var replyId = messageData.reply;
    console.log(replyId);
    delete messageData.reply;
    messageDAO.insert(messageData, function(message){
        if(replyId != null){
            messageDAO.singleGet(replyId, function(singleMessage){
                var messageReplyData = {
                    messageId: message.dataValues.id,
                    roomId: singleMessage.roomId,
                    memberId: singleMessage.memberId,
                    messagetypeId: singleMessage.messagetypeId,
                    body: messageData.replyBody,
                    attachment: singleMessage.attachment,
                    emoticonId: singleMessage.emoticonId,
                    attachmentFileName: singleMessage.attachmentFileName,
                    time: singleMessage.time
                };
                console.log(messageReplyData);
                messageDAO.insertMessageReply(messageReplyData, function(messagereply){
                    console.log(messagereply);
                    messageDAO.get(message.dataValues.id, function(fullMessage){
                        fullMessage.reply = messagereply.dataValues;
                        console.log(fullMessage);
                        socket.sendMessageToRoom(fullMessage.roomId, 'insertMessage', fullMessage);
                    });
                }, function(err){
                    console.log(err);
                });
            });
        } else {
            messageDAO.get(message.dataValues.id, function(fullMessage){
                socket.sendMessageToRoom(fullMessage.roomId, 'insertMessage', fullMessage);
            });
        }
    });
}