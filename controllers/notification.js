var notificationDAO = require('../models/notificationDAO'),
    session = require('../controllers/session'),
    socket = require('./socket');

exports.get = function (req, res) {
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if(idUser){
        notificationDAO.get(function(notification){
            res.send(200, notification);
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};

exports.add = function (req, res) {
    if (req.body == undefined) {
        res.send(400);
        return;
    }

    var notificationData = req.body;
    if([1, 2, 3].indexOf(notificationData.user.positionId) == -1) {
        console.log('Not allowed');
        res.send(400, 'Not allowed');
        return;
    }
    
    var idUser = session.getIdFromSession(req.cookies.SESSION);
    if (idUser && notificationData.content != '') {
        var data = {content:notificationData.content, memberId:notificationData.user.id};
        notificationDAO.insert(data, function(notification){
            notificationDAO.get(function(notification){
                socket.sendNotification('notificationUpdate', notification.dataValues);
                res.send(200);
            }, function(err){
                res.send(401);
            });
        }, function(err){
            res.send(401);
        });
    } else {
        res.send(401);
    }
};