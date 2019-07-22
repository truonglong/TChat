var roomDAO = require('../models/roomDAO');
var roommemberDAO = require('../models/roommemberDAO');
var messageDAO = require('../models/messageDAO');
var session = require('../controllers/session');
var memberController = require('../controllers/member');
var socket = require('./socket');

/*
 * 
 * Functions
 * 
 */
var removeAllMembers = function(roomId, ok, error){
    roommemberDAO.deleteAllMembers( { where: { roomId: roomId }},
        function(){
            if(ok) ok();
        },
        function(err){
            if(error) error(err);
        });
}

var removeAllMessages = function (roomId, ok, error) {
    messageDAO.deleteAllMessages({where: {roomId: roomId}},
        function() {
            if (ok) ok();
        },
        function(err) {
            if (error) error(err);
        }
    );
}

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
    var memberId = session.getIdFromSession(req.cookies.SESSION);
    roommemberDAO.listRoom({id: memberId}, function(rooms) {
        res.send(200, rooms);
    }, function(err){
        console.log(err);
        res.send(404);
    });
};

exports.listApi = function (req, res) {
    var memberId = session.getIdFromSession(req.cookies.SESSION);
    roommemberDAO.listRoom({id: memberId}, function(rooms) {
        for(var i in rooms){
            delete rooms[i].dataValues.members;
        }
        res.send(200, rooms);
    }, function(err){
        console.log(err);
        res.send(404);
    });
};

exports.update = function (req, res) {
    if (req.body == undefined) {
        res.send(400);
        return;
    }

    var room = req.body;

    roomDAO.update({name: room.name}, room.id, function() {
        console.log('Updated Room name OK');

        removeAllMembers(room.id, function(){
            console.log('Delete room member OK');

            // insert
            var roomMemberArray = [];
            room.members.forEach(function(el){
                roomMemberArray.push({roomId: room.id, memberId: el.memberId, isAdmin: el.isAdmin, isNotify: el.isNotify, isVisible: el.isVisible});
            });

            roommemberDAO.insert(roomMemberArray, function() {
                console.log('Insert room member OK');
                roomDAO.getById(room.id, function(rooms) {
                    console.log('Get room OK');
                    console.log(rooms);
                    socket.sendMessage('roomUpdate', rooms[0].dataValues);
                    res.send(200);

                    // WS update room member
                    roomMemberArray.forEach(function(el){
                        el.room = rooms[0].dataValues
                    });
                    socket.createNewRoom(room.id, roomMemberArray);
                    socket.sendMessage('roomMemberUpdate', roomMemberArray);
                }, function(err) {
                    console.log('get room ERR');
                    console.log(err);
                    res.send(500);
                })
            }, function(err){
                console.log('Insert room member ERR');
                console.log(err);
                res.send(500);
            });

        }, function(err){
            console.log('Delete room member ERR');
            console.log(err);
            res.send(500);
        });
    }, function(err){
        console.log('Update room name ERR');
        console.log(err);
        res.send(500);
    })
};

exports.updateSetting = function (req, res) {
    if (req.body == undefined) {
        res.send(400);
        return;
    }

    var roomList = req.body;
    var memberId = session.getIdFromSession(req.cookies.SESSION);

    var updateList = [];
    if(roomList) {
        roomList.forEach(function(el){
            updateList.push({
                roomId: el.id,
                memberId: memberId,
                isNotify: el.isNotify,
                isVisible: el.isVisible,
                isAdmin: el.isAdmin
            });
        });
    }
    roommemberDAO.update(updateList, function(result) {
        console.log('Update room member config OK', result);
        res.send(200);
    }, function(err){
        console.log('Update room member config ERR');
        console.log(err);
        res.send(500);
    })
};


exports.add = function (req, res) {
    if (req.body == undefined) {
        res.send(400);
        return;
    }

    var room = req.body;
    // team member is not allowed to add room
    if([1, 2, 3].indexOf(room.user.positionId) == -1) {
        console.log('Not allowed');
        res.send(400);
        return;
    }
    
    roomDAO.insert({name: room.name}, function(addedRoom) {
        var memberList = [{roomId: addedRoom.id, memberId: room.user.id, isAdmin: true, isVisible: true, isNotify: true}];
        roommemberDAO.insert(memberList, function(){
            console.log('Insert room member OK');
            addedRoom.dataValues.user = room.user;
            socket.createNewRoom(addedRoom.id, memberList);
            socket.sendMessage('roomAdd', addedRoom);
            res.send(200);
        }, function(err){
            console.log('Insert room member ERR');
            console.log(err);
            res.send(500);
        });
    }, function(err) {
        console.log('Add Room ERR');
        console.log(err);
        res.send(500);
    })
};

exports.delete = function(req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    var roomId = req.params.id;
    if (idUser && roomId){
        removeAllMembers(roomId, function() {
            removeAllMessages(roomId, function() {
                roomDAO.delete(roomId, function() {
                    socket.sendMessage('roomDelete', roomId);
                    res.send(200);
                }, function(err){
                    console.log(err);
                    res.send(500);
                });
            }, function(err) {
                console.log(err);
                res.send(500);
            });
        }, function(err){
            console.log(err);
            res.send(500);
        });
    }
}