var db = require('./databaseModel');

exports.get = function (username, password, success, error) {
    db.user.all({where: {username: username, password: password}}).then(function(user){
        if(success){
            success(user);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.getByUsername = function (username, success, error) {
    db.user.all({where: {username: username}}).then(function(user){
        if(success){
            success(user);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.insert = function (userData, success, error) {
    db.user.create(userData).then(function(user){
        if(success){
            success(user);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};


exports.update = function (where, update, success, error) {
    db.user.update(update, {where: where}).then(function(user){
        if(success){
            success(user);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};