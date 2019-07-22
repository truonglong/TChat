var db = require('./databaseModel');

exports.list = function (listIdRoom, callback) {
    db.room.all({where: {id: listIdRoom}}, function(err, roomList) {
        callback(err, roomList);
    });
};

exports.insert = function (roomData, success, error) {
    db.room.create(roomData).then(function(room){
        if(success){
            success(room);
        }
    })
    .catch(function(err){
        if(error){
            error(err);
        }
    });
}
exports.update = function (update, id, success, error) {
    db.room.update(update, {where: {id: id} }).then(function(room){
        if(success){
            success(room);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getById = function (id, success, error) {
    db.room.all({where: {id: id}}).then(function(room){
        if(success){
            success(room);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.delete = function(roomId, success, error) {
    db.room.destroy({where:{id: roomId}}).then(function(roomId){
        if (success) {
            success(roomId);
        }
    }).catch(function(err){
        if (error) {
            error(err);
        }
    })
}