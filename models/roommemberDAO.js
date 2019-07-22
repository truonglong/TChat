var db = require('./databaseModel');

exports.listMember = function (where, success, error) {
    db.member.findAll({
        include: [ { model: db.room, where: where} ]
    }).then(function(member){
        if(success){
            success(member);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.listRoom = function (where, success, error) {
    db.room.findAll({
        include: [ { model: db.member, where: where} ]
    }).then(function(member){
        if(success){
            success(member);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.listRoomMember = function (where, success, error) {

    var query = "SELECT `roommember`.`isAdmin`, `roommember`.`isNotify`, `roommember`.`note`, `roommember`.`memberId`, `roommember`.`roomId`, " 
    + " `rooms`.`id` AS `id`, `rooms`.`name` AS `name`, `rooms`.`lastMessageTime` AS `lastMessageTime`, "
    + "`rooms`.`priority` AS `priority`, `rooms`.`isAnonymous` AS `isAnonymous` "
    + " FROM `roommember` AS `roommember` LEFT OUTER JOIN `room` AS `rooms` ON `roommember`.`roomId` = `rooms`.`id` WHERE `roommember`.`memberId` = 47;";

    db.sequelize.query(query).then(function(data){
        if(success){
            success(data);
        }

    }).catch(function(err){
        if(error){
            error(err);
        }
    });

    //where.include = [{ model: db.room, where: { id: 4 }, required: false }];

    // db.roommember.findAll({
    //     where: where,
    //     include: [{ model: db.room, required: false }]
    // }).then(function(member){
    //     if(success){
    //         success(member);
    //     }
    // }).catch(function(err){
    //     if(error){
    //         error(err);
    //     }
    // });
};

exports.insert = function (data, success, error) {
    db.roommember.bulkCreate(data).then(function(roommember){
        if(success){
            success(roommember);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.deleteAllMembers = function (data, success, error) {
    db.roommember.destroy(data).then(function(roommember){
        if(success){
            success(roommember);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.update = function (data, success, error) {
    db.roommember.bulkCreate(data, { updateOnDuplicate: true }).then(function(roommember){
        if(success){
            success(roommember);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};