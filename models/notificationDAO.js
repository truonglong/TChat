var db = require('./databaseModel');

exports.get = function (success, error) {
    db.notification.find({limit: 1, order:[['id', 'DESC']]}).then(function(notification){
        if(success){
            success(notification);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};

exports.insert = function (notificationData, success, error) {
    db.notification.create(notificationData).then(function(notification){
        if(success){
            success(notification);
        }
    })
    .catch(function(err){
        if(error){
            error(err);
        }
    });
}