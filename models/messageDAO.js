var db = require('./databaseModel');

exports.insert = function (messageData, success) {
    db.message.create(messageData).then(function(message){
        if(success){
            success(message);
        }
    });
};

exports.insertMessageReply = function (messageData, success, error) {
    db.messagereply.create(messageData).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.list = function (idRoom, startTime, success, error) {
    db.message.findAll({where: {
                        roomId: idRoom,
                        time: {$lte: startTime}},
                        order: 'time DESC',
                        limit: 40,
                        include: [db.emoticon, db.member, db.messagereply]}).then(function(messageList){
        if(success){
            success(messageList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.get = function (id, success, error) {
    db.message.find({where: {id: id}, include: [db.emoticon, db.member, db.room, db.messagereply]}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getMessageReply = function (id, success, error) {
    db.messagereply.find({where: {id: id}, include: [db.emoticon, db.member, db.room]}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.singleGet = function (id, success, error) {
    db.message.find({where: {id: id}}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.update = function (where, update, success, error) {
    db.message.update(update, {where: where}).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.deleteAllMessages = function (data, success, error) {
    db.message.destroy(data).then(function(message){
        if(success){
            success(message);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};