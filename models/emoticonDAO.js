var db = require('./databaseModel');

exports.list = function (groupId, callback) {
    db.emoticon.findAll({where: {emoticongroupId: groupId}}).then(function( emoticonList) {
        callback(emoticonList);
    });
};

exports.get = function (id, callback) {
    db.emoticon.find(id).then(function( emoticonList) {
        callback(emoticonList);
    });
};

exports.getToList = function (id, index, callback) {
    db.emoticon.find(id, function(err, emoticon){
        callback(err, emoticon, index);
    });
};