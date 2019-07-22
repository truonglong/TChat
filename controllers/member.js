var memberDAO = require('../models/memberDAO');
var roommemberDAO = require('../models/roommemberDAO');
var session = require('./session');

var fs = require('fs'),
tchatApp = require('../app'),
jimp = require('jimp'),
sizeOf = require('image-size'),
socket = require('./socket');

/*
 * 
 * Functions
 * 
 */
function updateMember(data, res){
    memberDAO.update({username: data.username}, data,  function(){
        console.log('Update member OK');
        socket.sendMessage('memberUpdate', data);
        res.send(200);
    }, function(err){
        console.log(err);
        res.send(500);
    });
}

function getByUsername(username, success, error) {
    memberDAO.getByUsername(username, success, error);
};


function changeStatus(id, status, success) {
    memberDAO.update({id: id}, {status: status}, success);
};

function insertMember(userData, success, error) {
    memberDAO.insert(userData, function(user){
        if(success){
            success(user);
        }
    }, function(err){
        if(error) {
            error(err);
        }
    });
};

function insertRoomMember(data, success, error) {
    roommemberDAO.insert(data, function(user){
        if(success){
            success(user);
        }
    }, function(err){
        if(error) {
            error(err);
        }
    });
};

function deleteRoomMember(data, success, error) {
    roommemberDAO.delete(data, function(user){
        if(success){
            success(user);
        }
    }, function(err){
        if(error) {
            error(err);
        }
    });
};

/*
 * 
 * Exports
 * 
 */
exports.getByUsername = getByUsername;
exports.changeStatus = changeStatus;
exports.insert = insertMember;
exports.insertRoomMember = insertRoomMember;
exports.deleteRoomMember = deleteRoomMember;

/*
 * 
 * APIs
 * 
 */
exports.get = function (req, res) {
    var id = session.getIdFromSession(req.cookies.SESSION);
    memberDAO.get(id, function(member){
        res.send(200, member);
    }, function(err){
        res.send(404);
    });
};

exports.list = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.params.id){
        roommemberDAO.listMember({id: req.params.id}, function(members) {
            res.send(200, members);
        }, function(err){
            res.send(404);
        });
    } else {
        res.send(401);
    }
};

exports.listApi = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser && req.params.id){
        roommemberDAO.listMember({id: req.params.id}, function(members) {
            var memberList = [];
            for(var i in members){
                var member = members[i].dataValues;
                var roomMember = member.rooms[0].roommember.dataValues;
                delete member.rooms;
                roomMember.user = member;
                memberList.push(roomMember);
            }
            res.send(200, memberList);
        }, function(err){
            res.send(404);
        });
    } else {
        res.send(401);
    }
};

exports.listall = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser){
        memberDAO.all(function(memberList) {
            if(memberList){
                res.send(200, memberList);
            }
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};


exports.update = function (req, res) {
    if (req.body == undefined) {
        res.send(400);
        return;
    }

    var requestBody = req.body;
    var memberData = {
        id: requestBody.id,
        name: requestBody.name,
        username: requestBody.username
    };

    if(req.files && req.files.avatar && req.files.avatar.size > 0){
        console.log('has file');
        if (parseInt(req.files.avatar.size) > 10240000) {
            fs.unlinkSync(req.files.avatar.path);
            res.status(400);
            res.send('');
            return;
        }

        fs.readFile(req.files.avatar.path, function (err, data) {
            if (err) {
                console.log('read file avatar error');
                console.log(err);
                res.send(500);
            }
            else {
                var fileName = req.files.avatar.name;
                memberData.avatar = memberData.username + '_' + new Date().getTime() + '_' +  fileName;

                
                var extension = fileName.substring(fileName.lastIndexOf('.'));
                
                var filePath = 'images/avatar/' + memberData.avatar;
                
                fs.writeFile(tchatApp.__rootdirname + '/public/' + filePath, data, 'binary', function (err) {
                    if (err) {
                        console.log('write file avatar error');
                        console.log(err);
                        res.send(500);
                    } else {
                        console.log('update user avatar OK');
                        var dimensions = sizeOf(tchatApp.__rootdirname + '/public/' + filePath);
                        var fileThumb = tchatApp.__rootdirname + '/public/images/avatar/thumbnails/' + memberData.avatar;
                        if (dimensions.width <= 100 || dimensions.height <= 100 || dimensions.type.toLowerCase() == 'gif') {
                            fs.writeFile(fileThumb, data, 'binary', function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                updateMember(memberData, res);
                            });
                        } else {
                            jimp.read(tchatApp.__rootdirname + '/public/' + filePath, function(err, image) {
                                if (err) throw err;
                                image.resize(jimp.AUTO, 100)
                                    .write(fileThumb, function (err) {
                                        if (err) throw err;
                                        updateMember(memberData, res);
                                    });
                            });
                        }
                    }
                });
            }
        });
    } else {
        console.log('No file');
        updateMember(memberData, res);
    }
};