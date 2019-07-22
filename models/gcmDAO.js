var db = require('./databaseModel');

exports.get = function (registrationId, success, error) {
     
    db.gcm.all({ where: { registrationId: registrationId } }).then(function (gcm) {
        if(success){
            success(gcm);
        }
    }).catch(function (err){
        console.log('get GCM info: ' + registrationId);
        console.log(err);
        if(error){
            error(err);
        }
    });
};

exports.list = function (members, success, error) {
    var query;
    if (members) {
        query = { where: { memberId: { $or: members } } };
    }
    db.gcm.all(query).then(function (gcm) {
        if (success) {
            //console.log('====== GCM SELECTED ============');
            //console.log(gcm);
            success(gcm);
        }
    }).catch(function (err) {
        console.log(err);
        if (error) {
            error(err);
        }
    });
};

exports.insert = function (gcmData, success, error) {
    db.gcm.create(gcmData).then(function (gcm) {
        if(success){
            success(gcm);
        }
    }).catch(function(err){
        if(error){
            error(err);
        }
    });
};