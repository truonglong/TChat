var db = require('./databaseModel');

exports.getByUsername = function (username, success, error) {
    db.member.find({where: {username: username}, include: [db.position]}).then(function(member){
        if(success){
            success(member);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.list = function (idRoom, success, error){
    db.member.findAll({where: {room: idRoom}}).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.all = function (success, error){
    db.member.findAll({ include: [ db.position ]}).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.get = function (id, success, error) {
    db.member.find({ where: { id : id}, include: [db.position]}).then(function(member){
        if(success){
            success(member);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.update = function (where, update, success, error) {
    db.member.update(update, {where: where}).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.listById = function(idList, success, error){
    db.member.findAll({where: {id: idList}}).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.insert = function (memberData, success, error) {
    db.member.create(memberData).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.delete = function (memberData, success, error) {
    db.member.destroy(memberData).then(function(memberList){
        if(success){
            success(memberList);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};